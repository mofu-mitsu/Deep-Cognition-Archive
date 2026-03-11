let currentQIndex = 0;
let logs =[];
let startTime = 0;
let returnCount = 0;

let socioScore = { Ti: 0, Te: 0, Ni: 0, Ne: 0, Fi: 0, Fe: 0, Si: 0, Se: 0 };
let mbtiScore  = { Ti: 0, Te: 0, Ni: 0, Ne: 0, Fi: 0, Fe: 0, Si: 0, Se: 0 };
let enneaScore = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

// A(自己主張) / T(慎重) を判定するためのストレス・神経症傾向スコア
let nervousnessScore = 0; 

let shuffledQuestions = questionsData.sort(() => Math.random() - 0.5);

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('question-screen').classList.add('active');
    renderQuestion();
});

function renderQuestion() {
    startTime = Date.now();
    const q = shuffledQuestions[currentQIndex];
    document.getElementById('current-q').innerText = currentQIndex + 1;
    document.getElementById('total-q').innerText = shuffledQuestions.length; 
    
    const questionTextEl = document.getElementById('question-text');
    questionTextEl.innerText = q.text;

    // 追及問題の時は警告色に
    if (q.id && q.id.includes("followup")) {
        questionTextEl.style.color = "var(--warn-color)";
    } else {
        questionTextEl.style.color = "var(--accent-color)";
    }
    
    const inputArea = document.getElementById('input-area');
    const mediaArea = document.getElementById('media-area');
    inputArea.innerHTML = '';
    mediaArea.innerHTML = '';

    inputArea.classList.remove('slide-up');
    void inputArea.offsetWidth;
    inputArea.classList.add('slide-up');

    // ★ 抽象画像（SVG）の生成
    if (q.type === 'abstract_image') {
        mediaArea.innerHTML = `
            <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#58a6ff;stop-opacity:0.8" />
                        <stop offset="100%" style="stop-color:#f85149;stop-opacity:0.3" />
                    </linearGradient>
                </defs>
                <circle cx="70" cy="50" r="40" fill="url(#grad1)" />
                <polygon points="120,20 180,50 120,80" fill="none" stroke="#c9d1d9" stroke-width="2" stroke-dasharray="5,5"/>
                <line x1="20" y1="50" x2="180" y2="50" stroke="#30363d" stroke-width="1" />
            </svg>
        `;
    }

    if (q.type === 'text_input') {
        inputArea.innerHTML = `
            <div style="margin: 20px 0;">
                <input type="text" id="text-answer" placeholder="1単語、または短い言葉で..." autocomplete="off" 
                       style="width: 100%; padding: 12px; border-radius: 6px; border: 1px solid var(--border-color); background: #0d1117; color: var(--accent-color); font-family: inherit; font-size: 1.1em; text-align: center;">
            </div>
        `;
        // 次へ進めるようにダミーのスコアオブジェクトを入れておく
        currentScores = { isTextInput: true }; 
    }
    else if (q.type === 'checkbox') {
        let options = q.options.sort(() => Math.random() - 0.5);
        options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'checkbox-btn';
            btn.innerHTML = `<i class="far fa-square"></i> ${opt.text}`;
            btn.dataset.index = idx; 
            btn.onclick = () => toggleCheckbox(opt.scores, btn, opt);
            inputArea.appendChild(btn);
        });
        currentScores = { isCheckbox: true, selectedOptions:[] };
    } 
    else if (q.type === 'slider') {
        inputArea.innerHTML = `
            <div style="text-align:center; margin: 20px 0;">
                <p style="font-size:0.9em; color:#8b949e;">${q.labels[0]} ⬅️ ➡️ ${q.labels[1]}</p>
                <input type="range" id="main-slider" min="${q.min}" max="${q.max}" value="5" style="width:100%; cursor:pointer;">
                <p>現在値: <span id="slider-val" style="color:var(--accent-color); font-weight:bold; font-size:1.5em;">5</span></p>
            </div>
        `;
        document.getElementById('main-slider').addEventListener('input', (e) => {
            document.getElementById('slider-val').innerText = e.target.value;
            currentScores = { isSlider: true, value: parseInt(e.target.value) };
        });
        currentScores = { isSlider: true, value: 5 }; 
    }
    else {
        let options = q.options.sort(() => Math.random() - 0.5);
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
            btn.onclick = () => selectOption(opt, btn);
            inputArea.appendChild(btn);
        });
    }

    document.getElementById('confidence').value = 5;
}

let currentScores = null;

function selectOption(option, btnElement) {
    const buttons = document.querySelectorAll('#input-area button');
    buttons.forEach(b => {
        b.classList.remove('selected');
        b.querySelector('i').className = 'far fa-circle';
    });
    btnElement.classList.add('selected');
    btnElement.querySelector('i').className = 'fas fa-check-circle';
    currentScores = option; 
}

function toggleCheckbox(scores, btnElement, option) {
    btnElement.classList.toggle('selected');
    const icon = btnElement.querySelector('i');
    
    if (btnElement.classList.contains('selected')) {
        icon.className = 'fas fa-check-square';
        currentScores.selectedOptions.push(scores);
    } else {
        icon.className = 'far fa-square';
        currentScores.selectedOptions = currentScores.selectedOptions.filter(s => s !== scores);
    }
}

document.getElementById('ambiguous-btn').addEventListener('click', () => {
    currentScores = { scores: { socio: { Ti: 1, Ne: 1 }, mbti: { Ti: 1 }, ennea: { 5: 2, 6: 1 } } };
    goToNext(true);
});

document.getElementById('next-btn').addEventListener('click', () => {
    // 押すなボタンのトラップ処理
    if (shuffledQuestions[currentQIndex].type === 'button_trap' && !currentScores) {
        currentScores = { scores: { socio: { Ti: 1 }, mbti: { J: 1 }, ennea: { 1: 1, 6: 1 } } };
    }

    // ★ 記述問題の判定ロジック！
    if (currentScores && currentScores.isTextInput) {
        const textVal = document.getElementById('text-answer').value.trim();
        // 空白、または数字だけ（1とか123）、あるいは「あああ」みたいな適当な文字の場合
        if (textVal === "" || !isNaN(textVal) || textVal.length === 1) {
            // 適当判定！真面目に答えない＝P型・Se的衝動、または社会通念の拒絶（Ti）
            currentScores = { 
                scores: { socio: { Se: 1, Ti: 1 }, mbti: { P: 2 }, ennea: { 9: 1 } },
                loggedText: "※対象者は適当な文字列を入力、または回答を拒絶しました。"
            };
        } else {
            // ちゃんと単語を入力した＝意味を抽出するNi・Tiの働き
            currentScores = { 
                scores: { socio: { Ni: 2, Ti: 1 }, mbti: { Ni: 1 }, ennea: { 5: 1 } },
                loggedText: `「${textVal}」と入力（意味抽出を観測）`
            };
        }
    }

    if (!currentScores || (currentScores.isCheckbox && currentScores.selectedOptions.length === 0)) {
        alert("回答を選択（または入力）してください！");
        return;
    }
    goToNext(false);
});

function goToNext(isAmbiguous) {
    const timeTaken = Date.now() - startTime;
    const confidence = document.getElementById('confidence').value;

    // ★ 記述問題のテキストデータがあれば、ログに含める（裏仕様！）
    let loggedTextData = null;
    if (currentScores && currentScores.loggedText) {
        loggedTextData = currentScores.loggedText;
    }

    logs.push({ 
        qId: shuffledQuestions[currentQIndex].id, 
        timeMs: timeTaken, 
        isAmbiguous: isAmbiguous,
        textData: loggedTextData // ここで保存！
    });

    if (currentScores.isSlider) {
        nervousnessScore += (currentScores.value - 5);
    } 
    else if (currentScores.isCheckbox) {
        currentScores.selectedOptions.forEach(sc => addScores(sc));
    } 
    else if (currentScores.scores) {
        addScores(currentScores.scores);
    }

    if (currentScores.followUp) {
        shuffledQuestions.splice(currentQIndex + 1, 0, currentScores.followUp);
    }

    if (timeTaken > 15000) { socioScore.Ti += 0.5; socioScore.Ne += 0.5; enneaScore[5] += 0.5; }
    if (timeTaken < 3000) { socioScore.Se += 0.5; socioScore.Ni += 0.5; enneaScore[8] += 0.5; }

    currentScores = null;
    currentQIndex++;

    if (currentQIndex < shuffledQuestions.length) renderQuestion();
    else showResult();
}

function addScores(scoresObj) {
    if(scoresObj.socio) for (let key in scoresObj.socio) socioScore[key] += scoresObj.socio[key];
    if(scoresObj.mbti) for (let key in scoresObj.mbti) mbtiScore[key] += scoresObj.mbti[key];
    if(scoresObj.ennea) for (let key in scoresObj.ennea) enneaScore[key] += scoresObj.ennea[key];
}

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQIndex > 0) {
        returnCount++;
        currentQIndex--;
        socioScore.Ti += 1; 
        nervousnessScore += 1; 
        renderQuestion();
    }
});

// ★全判定関数群（省略せずに全部入れたよ！）

function calculateSocioType() {
    const sortedFunctions = Object.keys(socioScore).sort((a, b) => socioScore[b] - socioScore[a]);
    const f1 = sortedFunctions[0];
    const f2 = sortedFunctions[1];

    const typeMap = {
        'Ti-Ne': 'LII', 'Ne-Ti': 'ILE', 'Ti-Se': 'LSI', 'Se-Ti': 'SLE',
        'Ni-Te': 'ILI', 'Te-Ni': 'LIE', 'Ni-Fe': 'IEI', 'Fe-Ni': 'EIE',
        'Fi-Se': 'ESI', 'Se-Fi': 'SEE', 'Fi-Ne': 'EII', 'Ne-Fi': 'IEE',
        'Si-Fe': 'SEI', 'Fe-Si': 'ESE', 'Si-Te': 'SLI', 'Te-Si': 'LSE'
    };

    let type = typeMap[`${f1}-${f2}`] || typeMap[`${f2}-${f1}`];
    if (!type) {
        type = (socioScore.Ti + socioScore.Ne > socioScore.Ni + socioScore.Te) ? "LII" : "ILI";
    }
    return type;
}

function calculateEnneagram() {
    let topType = Object.keys(enneaScore).reduce((a, b) => enneaScore[a] > enneaScore[b] ? a : b);
    topType = parseInt(topType);
    let leftWing = topType === 1 ? 9 : topType - 1;
    let rightWing = topType === 9 ? 1 : topType + 1;
    let wing = enneaScore[leftWing] > enneaScore[rightWing] ? leftWing : rightWing;
    return `${topType}w${wing}`;
}

// ★ MBTI全タイプ計算ロジック
function calculateMBTI() {
    let e_i = (mbtiScore.Te + mbtiScore.Fe + mbtiScore.Ne + mbtiScore.Se) > (mbtiScore.Ti + mbtiScore.Fi + mbtiScore.Ni + mbtiScore.Si) ? "E" : "I";
    let s_n = (mbtiScore.Se + mbtiScore.Si) > (mbtiScore.Ne + mbtiScore.Ni) ? "S" : "N";
    let t_f = (mbtiScore.Te + mbtiScore.Ti) > (mbtiScore.Fe + mbtiScore.Fi) ? "T" : "F";
    // J/Pは外向判断機能(Te/Fe)と外向知覚機能(Se/Ne)の比較
    let j_p = (mbtiScore.Te + mbtiScore.Fe) > (mbtiScore.Se + mbtiScore.Ne) ? "J" : "P";
    return `${e_i}${s_n}${t_f}${j_p}`;
}

// ★ DCNH計算ロジック（みつきの定義通り！）
function calculateDCNH() {
    let d = socioScore.Te + socioScore.Fe; // ドミナント
    let c = socioScore.Ne + socioScore.Se; // クリエイター
    let n = socioScore.Ti + socioScore.Fi; // ノーマナイザー
    let h = socioScore.Ni + socioScore.Si; // ハーモナイザー
    
    let maxScore = Math.max(d, c, n, h);
    if (maxScore === h) return "H (Harmonizing / ハーモナイザー)";
    if (maxScore === n) return "N (Normalizing / ノーマナイザー)";
    if (maxScore === c) return "C (Creative / クリエイター)";
    return "D (Dominant / ドミナント)";
}

function calculateAT() {
    return nervousnessScore >= 0 ? "T (慎重型)" : "A (自己主張型)";
}

function showResult() {
    document.getElementById('question-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    let resultSocio = calculateSocioType(); 
    let resultEnnea = calculateEnneagram(); 
    let resultMBTI = calculateMBTI(); // ★MBTI動的計算！
    let resultDCNH = calculateDCNH(); // ★DCNH動的計算！
    let resultAT = calculateAT(); 

    // サブタイプロジック
    let subtypeFunc = Object.keys(socioScore).reduce((a, b) => socioScore[a] > socioScore[b] ? a : b);
    if (resultSocio === "LII" && socioScore.Ni >= socioScore.Ne && socioScore.Ni >= socioScore.Ti - 1) {
        subtypeFunc = "Ni"; 
    }

    document.getElementById('socio-type').innerText = resultSocio;
    document.getElementById('socio-sub').innerText = `${resultSocio}-${subtypeFunc}`;
    document.getElementById('dcnh-type').innerText = resultDCNH; // ★DCNH反映！
    document.getElementById('mbti-type').innerText = resultMBTI; // ★MBTI反映！
    
    document.getElementById('a-t-type').innerText = `${resultAT} / エニアグラム: ${resultEnnea}`;
    
    document.getElementById('socio-desc').innerText = socioDescriptions[resultSocio] || "解析不能です。";

    let textLogsHTML = "";
    const textLogs = logs.filter(l => l.textData);
    if (textLogs.length > 0) {
        textLogsHTML = `<br><span style="color:var(--warn-color);">📝[Metacognition Log]:</span><br>` + 
                       textLogs.map(l => `> ${l.textData}`).join('<br>');
    }

    document.getElementById('behavior-log').innerHTML = 
        `⏱ 平均回答時間: ${Math.round(logs.reduce((a,b)=>a+b.timeMs,0)/logs.length/1000)}秒<br>
         🔄 再検証(戻る)回数: ${returnCount}回 (Ti的思考ループ)<br>
         🧠 神経症的傾向スコア: ${nervousnessScore} (${resultAT})<br>
         ⚠️ 「定義が曖昧」使用: ${logs.filter(l=>l.isAmbiguous).length}回
         ${textLogsHTML}`; 

// === レーダーチャートの描画 ===
    const ctxRadar = document.getElementById('function-chart').getContext('2d');
    new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels:['Ti', 'Te', 'Ni', 'Ne', 'Fi', 'Fe', 'Si', 'Se'],
            datasets:[
                {
                    label: 'Socionics 機能',
                    data:[socioScore.Ti, socioScore.Te, socioScore.Ni, socioScore.Ne, socioScore.Fi, socioScore.Fe, socioScore.Si, socioScore.Se],
                    backgroundColor: 'rgba(88, 166, 255, 0.2)',
                    borderColor: '#58a6ff',
                    pointBackgroundColor: '#58a6ff',
                    borderWidth: 2
                },
                {
                    label: 'MBTI 推定機能',
                    data:[mbtiScore.Ti, mbtiScore.Te, mbtiScore.Ni, mbtiScore.Ne, mbtiScore.Fi, mbtiScore.Fe, mbtiScore.Si, mbtiScore.Se],
                    backgroundColor: 'rgba(63, 185, 80, 0.2)',
                    borderColor: '#3fb950',
                    pointBackgroundColor: '#3fb950',
                    borderWidth: 2
                }
            ]
        },
        options: { 
            scale: { ticks: { beginAtZero: true, display: false }, pointLabels: { color: '#c9d1d9' } }, 
            plugins: { legend: { labels: { color: '#c9d1d9' } } } 
        }
    });

    // === ★棒グラフ (Bar Chart) の描画 ===
    const ctxBar = document.getElementById('bar-chart').getContext('2d');
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels:['Ti', 'Te', 'Ni', 'Ne', 'Fi', 'Fe', 'Si', 'Se'],
            datasets:[
                {
                    label: 'Socionics',
                    data:[socioScore.Ti, socioScore.Te, socioScore.Ni, socioScore.Ne, socioScore.Fi, socioScore.Fe, socioScore.Si, socioScore.Se],
                    backgroundColor: '#58a6ff',
                    borderRadius: 4
                },
                {
                    label: 'MBTI 推定',
                    data:[mbtiScore.Ti, mbtiScore.Te, mbtiScore.Ni, mbtiScore.Ne, mbtiScore.Fi, mbtiScore.Fe, mbtiScore.Si, mbtiScore.Se],
                    backgroundColor: '#3fb950',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#30363d' },
                    ticks: { color: '#c9d1d9' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#c9d1d9' }
                }
            },
            plugins: {
                legend: { labels: { color: '#c9d1d9' } }
            }
        }
    });
}