let currentQIndex = 0;
let logs =[];
let startTime = 0;
let returnCount = 0;

let socioScore = { Ti: 0, Te: 0, Ni: 0, Ne: 0, Fi: 0, Fe: 0, Si: 0, Se: 0 };
let mbtiScore  = { Ti: 0, Te: 0, Ni: 0, Ne: 0, Fi: 0, Fe: 0, Si: 0, Se: 0 };
let enneaScore = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

// A(自己主張) / T(慎重) を判定するためのストレス・神経症傾向スコア
let nervousnessScore = 0; 

const MAX_QUESTIONS = 15;
// 全部シャッフルしてから、先頭の15問だけ切り取る！
let shuffledQuestions = questionsData.sort(() => Math.random() - 0.5).slice(0, MAX_QUESTIONS);

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

    // 抽象画像（SVG）の生成
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
    else if (q.type === 'minigame_number') {
        inputArea.innerHTML = `
            <div class="minigame-container" style="text-align: center; margin: 30px 0;">
                <div id="minigame-number" style="font-size: 5em; font-weight: bold; color: var(--accent-color); font-variant-numeric: tabular-nums;">0</div>
                <button id="minigame-stop-btn" class="danger-btn" style="margin-top: 20px; font-size: 1.5em; width: 80%;">🛑 STOP</button>
            </div>
            <div id="minigame-options" class="slide-up" style="display: none; margin-top: 20px;">
                <p style="color: var(--warn-color); font-weight: bold;">👁️ [System: 行動解析] なるほど、その数字で止めましたか。<br>……なぜ『そのタイミング』で止めたのですか？</p>
            </div>
        `;

        let currentNum = 0;
        const numEl = document.getElementById('minigame-number');
        const stopBtn = document.getElementById('minigame-stop-btn');
        const optionsArea = document.getElementById('minigame-options');

        // 超高速で1〜100をカウントアップ！
        let intervalId = setInterval(() => {
            currentNum++;
            if (currentNum > 100) currentNum = 1; // 100を超えたら1に戻る
            numEl.innerText = currentNum;
        }, 15); 

        stopBtn.onclick = () => {
            clearInterval(intervalId); // ストップ！
            stopBtn.style.display = 'none'; // ボタンを消す
            optionsArea.style.display = 'block'; // 深掘り選択肢を出す

            // チャッピー提案の認知行動ごとの選択肢！
            const options =[
                { text: "待つのが面倒で、直感的にすぐ止めた。", scores: { socio: { Se: 3 }, mbti: { Se: 3 }, ennea: { 7: 2, 8: 1 } } },
                { text: "キリの良い数字やゾロ目（77等）を、タイミングを計算して狙って止めた。", scores: { socio: { Ti: 3 }, mbti: { Ti: 3 }, ennea: { 5: 2, 1: 2 } } },
                { text: "ギリギリの90台までどこまでいけるか、限界を試す実験をした。", scores: { socio: { Ne: 3 }, mbti: { Ne: 3 }, ennea: { 7: 2 } } },
                { text: "じっくり様子を観察し、「この辺りが安全だろう」という自分の予測で止めた。", scores: { socio: { Ni: 3 }, mbti: { Ni: 3 }, ennea: { 5: 2, 9: 1 } } },
                { text: "特に何も考えず、なんとなく適当に止めた。", scores: { socio: { Si: 2 }, mbti: { Fi: 2 }, ennea: { 9: 2 } } }
            ].sort(() => Math.random() - 0.5);

            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
                btn.onclick = () => {
                    optionsArea.querySelectorAll('button').forEach(b => {
                        b.classList.remove('selected');
                        b.querySelector('i').className = 'far fa-circle';
                    });
                    btn.classList.add('selected');
                    btn.querySelector('i').className = 'fas fa-check-circle';
                    
                    // スコアと「止めた数字のログ」を保存！
                    currentScores = { 
                        scores: opt.scores,
                        loggedText: `🎮 ミニゲーム: 「${currentNum}」で停止 → ${opt.text.split('（')[0]}`
                    };
                };
                optionsArea.appendChild(btn);
            });
        };
        currentScores = null; // ストップして理由を選ぶまで次へ行けない
    }
    if (q.type === 'text_input') {
        inputArea.innerHTML = `
            <div style="margin: 20px 0;">
                <input type="text" id="text-answer" placeholder="1単語、または短い言葉で..." autocomplete="off" 
                       style="width: 100%; padding: 12px; border-radius: 6px; border: 1px solid var(--border-color); background: #0d1117; color: var(--accent-color); font-family: inherit; font-size: 1.1em; text-align: center;">
            </div>
        `;
        currentScores = { isTextInput: true }; 
    }
    // ★ ここがバグ修正版のランキングUI処理！
    else if (q.type === 'ranking') {
        let options = q.options.sort(() => Math.random() - 0.5);
        let selectedOrder =[];

        // 描画専用の関数を作って、クロージャのバグを回避したよ！
        const updateRankingUI = () => {
            inputArea.innerHTML = ''; 
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'ranking-btn';
                
                const rankIndex = selectedOrder.indexOf(opt);
                if (rankIndex !== -1) {
                    btn.innerHTML = `<span class="rank-badge">${rankIndex + 1}</span> ${opt.text}`;
                    btn.classList.add('selected');
                } else {
                    btn.innerText = opt.text;
                }
                
                btn.onclick = () => {
                    // すでに選ばれていたら解除
                    if (selectedOrder.includes(opt)) {
                        selectedOrder = selectedOrder.filter(item => item !== opt);
                    } else {
                        selectedOrder.push(opt);
                    }
                    
                    if (selectedOrder.length === options.length) {
                        currentScores = { isRanking: true, order: selectedOrder };
                    } else {
                        currentScores = null; 
                    }
                    
                    updateRankingUI(); // 再描画
                };
                inputArea.appendChild(btn);
            });
        };
        
        updateRankingUI(); // 初回描画
    }
    // カードテストの処理
    else if (q.type === 'cards') {
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'card-container';
        q.options.forEach(opt => {
            const btn = document.createElement('div');
            btn.className = `card-btn ${opt.color}`;
            btn.innerHTML = `<div>${opt.symbol}</div><div class="card-desc">${opt.text.split('：')[1].replace(')','')}</div>`;
            btn.onclick = () => {
                document.querySelectorAll('.card-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                currentScores = { scores: opt.scores }; 
            };
            cardWrapper.appendChild(btn);
        });
        inputArea.appendChild(cardWrapper);
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
    if (shuffledQuestions[currentQIndex].type === 'button_trap' && !currentScores) {
        currentScores = { scores: { socio: { Ti: 1 }, mbti: { J: 1 }, ennea: { 1: 1, 6: 1 } } };
    }

    if (currentScores && currentScores.isTextInput) {
        const textVal = document.getElementById('text-answer').value.trim();
        if (textVal === "" || !isNaN(textVal) || textVal.length === 1) {
            currentScores = { 
                scores: { socio: { Se: 1, Ti: 1 }, mbti: { P: 2 }, ennea: { 9: 1 } },
                loggedText: "※対象者は適当な文字列を入力、または回答を拒絶しました。"
            };
        } else {
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

    let loggedTextData = null;
    if (currentScores && currentScores.loggedText) {
        loggedTextData = currentScores.loggedText;
    }

    logs.push({ 
        qId: shuffledQuestions[currentQIndex].id, 
        timeMs: timeTaken, 
        isAmbiguous: isAmbiguous,
        textData: loggedTextData 
    });
    if (currentScores && currentScores.nervousnessDelta) {
        nervousnessScore += currentScores.nervousnessDelta;
    }

    if (currentScores && currentScores.isSlider) {
        nervousnessScore += (currentScores.value - 5);
    } 
    // ★ スコアの重複加算バグを修正して綺麗にまとめたよ！
    if (currentScores.isSlider) {
        nervousnessScore += (currentScores.value - 5);
    } 
    else if (currentScores.isCheckbox) {
        currentScores.selectedOptions.forEach(sc => addScores(sc));
    } 
    else if (currentScores.isRanking) {
        currentScores.order.forEach((opt, index) => {
            let multiplier = 0;
            if (index === 0) multiplier = 3;
            if (index === 1) multiplier = 2;
            if (index === 2) multiplier = 1;
            
            if (multiplier > 0) {
                if(opt.scores.socio) for (let key in opt.scores.socio) socioScore[key] += (opt.scores.socio[key] * multiplier);
                if(opt.scores.mbti) for (let key in opt.scores.mbti) mbtiScore[key] += (opt.scores.mbti[key] * multiplier);
                if(opt.scores.ennea) for (let key in opt.scores.ennea) enneaScore[key] += (opt.scores.ennea[key] * multiplier);
            }
        });
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

function calculateMBTI() {
    let e_i = (mbtiScore.Te + mbtiScore.Fe + mbtiScore.Ne + mbtiScore.Se) > (mbtiScore.Ti + mbtiScore.Fi + mbtiScore.Ni + mbtiScore.Si) ? "E" : "I";
    let s_n = (mbtiScore.Se + mbtiScore.Si) > (mbtiScore.Ne + mbtiScore.Ni) ? "S" : "N";
    let t_f = (mbtiScore.Te + mbtiScore.Ti) > (mbtiScore.Fe + mbtiScore.Fi) ? "T" : "F";
    let j_p = (mbtiScore.Te + mbtiScore.Fe) > (mbtiScore.Se + mbtiScore.Ne) ? "J" : "P";
    return `${e_i}${s_n}${t_f}${j_p}`;
}

function calculateDCNH() {
    let d = socioScore.Te + socioScore.Fe; 
    let c = socioScore.Ne + socioScore.Se; 
    let n = socioScore.Ti + socioScore.Fi; 
    let h = socioScore.Ni + socioScore.Si; 
    
    let maxScore = Math.max(d, c, n, h);
    if (maxScore === h) return "H (Harmonizing / ハーモナイザー)";
    if (maxScore === n) return "N (Normalizing / ノーマナイザー)";
    if (maxScore === c) return "C (Creative / クリエイター)";
    return "D (Dominant / ドミナント)";
}

function calculateAT() {
    if (nervousnessScore >= 2) {
        return "T (慎重型 / 激しく反芻・葛藤する)";
    } else if (nervousnessScore >= 0) {
        return "T (慎重型 / やや警戒心が強い)";
    } else if (nervousnessScore >= -3) {
        return "A (自己主張型 / 対策による不安消去)";
    } else {
        return "A (自己主張型 / 圧倒的自信・唯我独尊)";
    }
}

function showResult() {
    document.getElementById('question-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    let resultSocio = calculateSocioType(); 
    let resultEnnea = calculateEnneagram(); 
    let resultMBTI = calculateMBTI(); 
    let resultDCNH = calculateDCNH(); 
    let resultAT = calculateAT(); 

    let subtypeFunc = Object.keys(socioScore).reduce((a, b) => socioScore[a] > socioScore[b] ? a : b);
    if (resultSocio === "LII" && socioScore.Ni >= socioScore.Ne && socioScore.Ni >= socioScore.Ti - 1) {
        subtypeFunc = "Ni"; 
    }

    document.getElementById('socio-type').innerText = resultSocio;
    document.getElementById('socio-sub').innerText = `${resultSocio}-${subtypeFunc}`;
    document.getElementById('dcnh-type').innerText = resultDCNH; 
    document.getElementById('mbti-type').innerText = resultMBTI; 
    
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
        options: { scale: { ticks: { beginAtZero: true, display: false }, pointLabels: { color: '#c9d1d9' } }, plugins: { legend: { labels: { color: '#c9d1d9' } } } }
    });

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
                y: { beginAtZero: true, grid: { color: '#30363d' }, ticks: { color: '#c9d1d9' } },
                x: { grid: { display: false }, ticks: { color: '#c9d1d9' } }
            },
            plugins: { legend: { labels: { color: '#c9d1d9' } } }
        }
    });
}

