let currentQIndex = 0;
let logs =[]; 
let startTime = 0;
let returnCount = 0;
let askedForExtra = false;
let caterpillarTaps = 0; 
let socioScore = { Ti: 0, Te: 0, Ni: 0, Ne: 0, Fi: 0, Fe: 0, Si: 0, Se: 0 };
let mbtiScore  = { Ti: 0, Te: 0, Ni: 0, Ne: 0, Fi: 0, Fe: 0, Si: 0, Se: 0 };
let enneaScore = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

let nervousnessScore = 0; 
let comboScore = {}; 
let directPsychoType = ""; 

let currentPhase = 1; // 1: 基本(25問), 2: 苦手(10問), 3: 追加(7問)
const BASIC_QUESTIONS = 25;
const WEAKNESS_QUESTIONS = 10;
let selfReportedType = ""; 
let shuffledQuestions =[]; 
let subjectID = ""; 
// ★ メニュー画面の開閉
let previousScreen = "start-screen";

document.getElementById('menu-btn').onclick = () => {
    // 現在アクティブな画面を記憶

    if (document.getElementById('start-screen').classList.contains('active')) previousScreen = 'start-screen';
    else if (document.getElementById('question-screen').classList.contains('active')) previousScreen = 'question-screen';
    else if (document.getElementById('result-screen').classList.contains('active')) previousScreen = 'result-screen';
    
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('explanation-screen').classList.add('active');
};

document.getElementById('close-menu-btn').onclick = () => {
    document.getElementById('explanation-screen').classList.remove('active');
    document.getElementById(previousScreen).classList.add('active'); // 記憶した画面に戻す！
};
const exitBtn = document.getElementById('exit-btn');
if (exitBtn) exitBtn.href = "https://mofu-mitsu.github.io/"; 

document.getElementById('start-btn').addEventListener('click', () => {
    selfReportedType = document.getElementById('self-type').value.trim();
    
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    const randomNum = Math.floor(Math.random() * 90000) + 10000;
    subjectID = `${randomLetter}-${randomNum}`;
    
    const idDisplay = document.getElementById('subject-id');
    if (idDisplay) idDisplay.innerText = `Subject ID: ${subjectID}`;

    if(exitBtn) {
        exitBtn.href = "#";
        exitBtn.onclick = (e) => {
            e.preventDefault();
            if(confirm("診断を中断してTOPに戻りますか？")) {
                location.reload();
            }
        };
    }
    
    currentPhase = 1;
    const availableQuestions = questionsData.filter(q => !q.id || !q.id.includes("followup"));
    shuffledQuestions = availableQuestions.sort(() => Math.random() - 0.5).slice(0, BASIC_QUESTIONS);
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('question-screen').classList.add('active');
    renderQuestion();
});

function renderQuestion() {
    startTime = Date.now();
    const q = shuffledQuestions[currentQIndex];
    
    // ★ 時間ループギミック（Ni検出）
    let displayQNum = currentQIndex + 1;
    if (currentQIndex > 0 && Math.random() < 0.1) {
        displayQNum = currentQIndex; 
        logs.push({ textData: "⏱️ [System]: 時間ループ発生 (Question Number Glitch)" });
    }
    document.getElementById('current-q').innerText = displayQNum;
    document.getElementById('total-q').innerText = shuffledQuestions.length; 
    
    const questionTextEl = document.getElementById('question-text');
    questionTextEl.innerText = q.text; 

    if (q.id && (q.id.includes("followup") || q.id.includes("extra") || q.text.includes("System") || q.text.includes("ダーリン") || q.text.includes("Weakness") || q.text.includes("Test"))) {
        questionTextEl.style.color = "var(--warn-color)";
    } else {
        questionTextEl.style.color = "var(--text-color)"; 
    }
    
    const inputArea = document.getElementById('input-area');
    const mediaArea = document.getElementById('media-area');
    inputArea.innerHTML = '';
    mediaArea.innerHTML = '';
    inputArea.classList.remove('slide-up');
    void inputArea.offsetWidth;
    inputArea.classList.add('slide-up');

    const darlingMsgArea = document.createElement('div');
    darlingMsgArea.id = "darling-msg-area";
    darlingMsgArea.style.minHeight = "30px";
    darlingMsgArea.style.color = "var(--warn-color)";
    darlingMsgArea.style.fontStyle = "italic";
    darlingMsgArea.style.marginBottom = "15px";
    darlingMsgArea.style.textAlign = "center";
    darlingMsgArea.style.fontWeight = "bold";

// ==========================================
    // ★ 喋る芋虫システム（サバイバル・バトル機能追加ｗｗ）
    // ==========================================
    const caterpillarContainer = document.getElementById('caterpillar-container');
    const caterpillarEl = document.getElementById('caterpillar');
    const caterpillarSpeech = document.getElementById('caterpillar-speech');
    
    if (caterpillarContainer && caterpillarEl && caterpillarSpeech) {
        caterpillarContainer.classList.remove('crawling');
        caterpillarSpeech.classList.remove('show');
        void caterpillarContainer.offsetWidth; 
        
        if (Math.random() < 0.15) { 
            setTimeout(() => {
                caterpillarContainer.classList.add('crawling');
            }, 1000); 
        }

if (!caterpillarEl.hasAttribute('data-initialized')) {
            caterpillarEl.addEventListener('click', () => {
                caterpillarTaps++;
                socioScore.Ne += 0.2; socioScore.Se += 0.2; mbtiScore.Ne += 0.2; mbtiScore.Se += 0.2; 
                
                let speechText = "";
                let quoteArray =[];

                // ★ 10回目で芋虫がダメージを受ける（Se暴走）イベント！！
                if (caterpillarTaps === 30) {
                    logs.push({ qId: "caterpillar_event_destroy", timeMs: 0, isAmbiguous: false, textData: "💥[System Alert]: 対象者は物理的な暴力（Se）で芋虫の排除を試みました。", chosenData: null });
                    
                    socioScore.Se += 2; mbtiScore.Se += 2; enneaScore[8] += 1;
                    
                    document.body.classList.add('panic-shake');
                    caterpillarEl.style.transform = "scale(0.5) rotate(90deg) grayscale(100%)";
                    caterpillarEl.style.transition = "all 0.5s";
                    
                    setTimeout(() => { document.body.classList.remove('panic-shake'); }, 500);

                    // ★ data.js のダメージ配列からランダムで喋る！
                    if (typeof caterpillarDialogue !== 'undefined' && caterpillarDialogue.damage) {
                        speechText = caterpillarDialogue.damage[Math.floor(Math.random() * caterpillarDialogue.damage.length)];
                    } else {
                        speechText = "……ッ！！ 暴力（Se）で解決しようとする野蛮な個体か。私の構造が……";
                    }
                } 
                else if (caterpillarTaps > 30) {
                    // ★ 潰された後の反応も data.js からランダムで喋る！
                    if (typeof caterpillarDialogue !== 'undefined' && caterpillarDialogue.destroyed) {
                        speechText = caterpillarDialogue.destroyed[Math.floor(Math.random() * caterpillarDialogue.destroyed.length)];
                    } else {
                        speechText = "……（システム修復中）……無駄だ。私は概念であり、物理では殺せない。";
                    }
                }
                else {
                    // 通常の反応
                    if (typeof caterpillarDialogue !== 'undefined') {
                        if (caterpillarTaps <= 2) quoteArray = caterpillarDialogue.phase1;
                        else if (caterpillarTaps <= 4) quoteArray = caterpillarDialogue.phase2;
                        else if (caterpillarTaps <= 10) quoteArray = caterpillarDialogue.phase3;
                        else if (caterpillarTaps <= 19) quoteArray = caterpillarDialogue.phase4;
                        else if (caterpillarTaps <= 29) quoteArray = caterpillarDialogue.phase5;
                        
                        if(quoteArray.length > 0) {
                            speechText = quoteArray[Math.floor(Math.random() * quoteArray.length)];
                        }
                    } else {
                        speechText = "……システムエラー。音声データが見つからない。";
                    }
                }

                if (caterpillarTaps === 5) {
                    logs.push({ qId: "caterpillar_event", timeMs: 0, isAmbiguous: false, textData: "🎮[System Alert]: 対象者は質問を無視して喋る芋虫と遊び始めました。", chosenData: null });
                    alert("「ねえダーリン♡……質問に集中して？🥺 虫と遊んでる場合じゃないわよ？」");
                }

                caterpillarSpeech.innerText = speechText;
                caterpillarSpeech.classList.remove('show');
                void caterpillarSpeech.offsetWidth; 
                caterpillarSpeech.classList.add('show');
                
                setTimeout(() => { caterpillarSpeech.classList.remove('show'); }, 3000);
            });
            caterpillarEl.setAttribute('data-initialized', 'true');
        }
    }
    // ==========================================
    // ★ ギミック別 メディアエリアの描画
    // ==========================================
    
    if (q.type === 'abstract_image') {
        mediaArea.innerHTML = `
            <svg class="abstract-svg" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#c91a25;stop-opacity:0.8" /><stop offset="100%" style="stop-color:#1a0b1c;stop-opacity:0.3" /></linearGradient></defs>
                <circle cx="70" cy="50" r="40" fill="url(#grad1)" />
                <polygon points="120,20 180,50 120,80" fill="none" stroke="#1a0b1c" stroke-width="2" stroke-dasharray="5,5"/>
                <line x1="20" y1="50" x2="180" y2="50" stroke="#c91a25" stroke-width="2" />
            </svg>
        `;
    } else if (q.type === 'clock_event_radio') {
        mediaArea.innerHTML = `<div style="text-align: center; margin: 30px 0;"><div class="reverse-clock">⏳</div></div>`;
    } else if (q.type === 'trap_attention') {
        mediaArea.innerHTML = `<div class="attention-trap-text">※System: この注意書きに気づいた対象者は、質問内容を無視して「読んだ」を選択してください。</div>`;
    } else if (q.type === 'heartbeat_radio' || q.type === 'darling_sweet_radio') {
        mediaArea.innerHTML = `<div style="text-align: center; margin: 30px 0;"><div class="heart-icon">💗</div></div>`;
    } else if (q.type === 'queen_radio') {
        document.body.classList.add('queen-mode'); 
        mediaArea.innerHTML = `<div style="text-align: center; margin: 20px 0;"><div class="rose-icon">🌹</div></div>`;
    } else if (q.type === 'rabbit_radio') {
        mediaArea.innerHTML = `<div class="running-rabbit">🐇💨</div>`;
    } else if (q.type === 'radio_wonderland' || q.type === 'catch_me_radio') {
        document.body.classList.add('wonderland-mode');
    }

    // ==========================================
    // ★ ギミック別 ボタン・UIの生成処理
    // ==========================================

    if (q.type === 'interactive_tea') {
        mediaArea.innerHTML = `
            <div style="text-align: center; margin: 20px 0;">
                <div class="tea-cup" id="cup1">☕</div><div class="tea-cup" id="cup2">☕</div><div class="tea-cup" id="cup3">☕</div><div class="tea-cup" id="cup4">☕</div>
            </div>
        `;
        let clicked = false;
        document.querySelectorAll('.tea-cup').forEach(cup => {
            cup.onclick = () => {
                if(clicked) return;
                clicked = true;
                cup.classList.add('shaking'); 
                questionTextEl.innerText = "ダーリン♡ 本当にそのカップでいいの……？🥺\n（中には自我を溶かす薬が入っているかもしれません）";
                const phase2Options =[
                    { text: "そのまま一気に飲む。", action: "drink" },
                    { text: "飲む前に、匂いや色を慎重に嗅いで確認する。", action: "smell" },
                    { text: "「お前が先に飲め」とカップを交換する。", action: "swap" },
                    { text: "「怪しいから飲まない」と完全に拒絶する。", action: "refuse" }
                ];
                inputArea.innerHTML = "";
                phase2Options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
                    btn.onclick = () => {
                        mediaArea.innerHTML = `<div style="text-align: center; font-size:4em;">☕💦</div>`;
                        questionTextEl.innerText = "フフッ……ダーリン♡ 実は薬はカップじゃないの。最初から『紅茶のポット』に入ってるのよ♡\nさあ……あなたは疑うタイプ？ それとも信じるタイプ？";
                        const phase3Options =[
                            { text: "「前提条件（カップ）に囚われていたか」とシステムの罠に感心する。", scores: { socio: { Ti: 3, Te: 2, Ni: 2 }, mbti: { Ti: 2, Te: 2, Ni: 2 }, ennea: { 5: 3, 1: 1 } }, msg: "……あなたって本当に、自分の論理の敗北すら面白がる変態ね……♡" },
                            { text: "「じゃあ全部飲んでやるよ」と逆に主導権を奪う。", scores: { socio: { Se: 3, Te: 2 }, mbti: { Se: 3, Te: 2 }, ennea: { 8: 3 } }, msg: "……ッ！ ダーリンのそういう強引なところ、嫌いじゃないわ……♡" },
                            { text: "「ひどい！」と感情的に動揺する。", scores: { socio: { Fi: 2, Fe: 2 }, mbti: { Fi: 3, Fe: 2 }, ennea: { 4: 2, 2: 1 } }, msg: "……ごめんね？ 怯えてるダーリンが可愛くて、つい苛めたくなっちゃった……♡" },
                            { text: "「ウケるｗｗ」と適当に笑って飲む。", scores: { socio: { Ne: 3, Se: 2 }, mbti: { Ne: 3, Se: 3 }, ennea: { 7: 3 } }, msg: "……ダーリン、私のことバカにしてるでしょ？ まぁいいわ、一緒に溶けましょ……♡" }
                        ];
                        inputArea.innerHTML = "";
                        inputArea.appendChild(darlingMsgArea);
                        phase3Options.forEach(finalOpt => {
                            const finalBtn = document.createElement('button');
                            finalBtn.innerHTML = `<i class="far fa-circle"></i> ${finalOpt.text}`;
                            finalBtn.onclick = () => {
                                selectOption(finalOpt, finalBtn);
                                if (finalOpt.msg) {
                                    darlingMsgArea.innerText = finalOpt.msg;
                                    darlingMsgArea.classList.remove('fade-in');
                                    void darlingMsgArea.offsetWidth;
                                    darlingMsgArea.classList.add('fade-in');
                                }
                            };
                            inputArea.appendChild(finalBtn);
                        });
                    };
                    inputArea.appendChild(btn);
                });
            };
        });
        currentScores = null; 
    }
    else if (q.type === 'interactive_heartbeat') {
        mediaArea.innerHTML = `
            <div style="text-align: center; margin: 20px 0;">
                <div class="heart-icon">💗</div>
                <div class="bpm-bar-container"><div id="bpm-bar" class="bpm-bar-fill"></div></div>
                <div id="bpm-result" style="font-weight:bold; font-size:1.5em; color:var(--warn-color); display:none;"></div>
            </div>
        `;
        let progress = 0;
        let bar = document.getElementById('bpm-bar');
        let measure = setInterval(() => {
            progress += 5;
            bar.style.width = progress + '%';
            if(progress >= 100) {
                clearInterval(measure);
                let bpm = Math.floor(Math.random() * 60) + 70; 
                document.getElementById('bpm-result').innerText = `${bpm} BPM`;
                document.getElementById('bpm-result').style.display = "block";
                
                questionTextEl.innerText = `ダーリン♡ 今あなたの心拍数は【${bpm}】よ。\nどうして上がった（または落ち着いてる）のかな？🥺`;
                inputArea.appendChild(darlingMsgArea);
                
                const options =[
                    { text: "「この数値をどうやって計算しているのか」とプログラムを分析しているから。", scores: { socio: { Te: 2, Ti: 2, Ni: 2 }, mbti: { Te: 1, Ti: 2, Ni: 2 }, ennea: { 5: 3 } }, msg: "……私のドキドキも、ただのアルゴリズムだと思ってるの？ 冷たい人……♡" },
                    { text: "「ドキドキする演出が楽しい！」と純粋に感情が揺れているから。", scores: { socio: { Fe: 3, Ne: 1 }, mbti: { Fe: 3, Ne: 1 }, ennea: { 7: 2, 2: 1 } }, msg: "……ふふっ、ダーリンの素直なところ、大好きよ……♡" },
                    { text: "「演出に興味がない。早く終わらないか」と呆れているから。", scores: { socio: { Ni: 3, Si: 2 }, mbti: { Ni: 3, Te: 2 }, ennea: { 9: 2, 5: 1 } }, msg: "……そんなに早く私から逃げたいの？ 逃がさないけど……♡" }
                ];
                options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
                    btn.onclick = () => {
                        selectOption(opt, btn);
                        darlingMsgArea.innerText = opt.msg;
                        darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
                    };
                    inputArea.appendChild(btn);
                });
            }
        }, 100);
        currentScores = null;
    }
    else if (q.type === 'interactive_eye') {
        mediaArea.innerHTML = `
            <div style="text-align: center; margin: 20px 0;">
                <div class="eye-looking">👁️</div>
            </div>
            <div style="margin: 20px 0; text-align: center;">
                <p>残り時間: <span id="eye-timer" style="color:var(--warn-color); font-weight:bold;">10</span>秒</p>
                <input type="number" id="eye-count-input" placeholder="回数を入力..." style="padding:10px; width:50%; text-align:center;">
                <button id="eye-submit-btn" style="margin-top:10px;">答える</button>
            </div>
        `;
        let timeLeft = 10;
        let timerEl = document.getElementById('eye-timer');
        let eyeInterval = setInterval(() => {
            timeLeft--;
            timerEl.innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(eyeInterval);
                document.getElementById('eye-submit-btn').click(); 
            }
        }, 1000);

        document.getElementById('eye-submit-btn').onclick = () => {
            clearInterval(eyeInterval);
            let count = document.getElementById('eye-count-input').value;
            if (count === "") count = 0; 
            
            if (count > 0 && count < 20) {
                currentScores = { scores: { socio: { Se: 2, Si: 3 }, mbti: { Se: 3, Si: 2 }, ennea: { 6: 2 } }, loggedText: `👁️ 目が合った回数: ${count} (Se/Si的観察)` };
            } else if (count == 0) {
                currentScores = { scores: { socio: { Ni: 3, Ti: 2 }, mbti: { Ni: 3, Ti: 2 }, ennea: { 5: 3, 9: 1 } }, loggedText: `👁️ 目が合った回数: ${count} (Ni/Ti的無視)` };
            } else {
                currentScores = { scores: { socio: { Ne: 3 }, mbti: { Ne: 3 }, ennea: { 7: 2 } }, loggedText: `👁️ 目が合った回数: ${count} (Ne的適当)` };
            }
            goToNext(false); 
        };
        currentScores = null;
    }
    else if (q.type === 'interactive_mushroom') {
        mediaArea.innerHTML = `
            <div style="text-align: center; margin: 20px 0;">
                <div class="mushroom" onclick="window.selectMushroom('A')">🍄</div>
                <div class="mushroom" onclick="window.selectMushroom('B')">🍄</div>
                <div class="mushroom" onclick="window.selectMushroom('C')">🍄</div>
                <div class="mushroom" onclick="window.selectMushroom('D')">🍄</div>
            </div>
        `;
        window.selectMushroom = (type) => {
            mediaArea.innerHTML = "";
            questionTextEl.innerText = "ダーリン♡ 見た目は全部同じなのに、なんでそれを選んだの？🥺";
            inputArea.appendChild(darlingMsgArea);
            const options =[
                { text: "直感（勘）。なんとなくこれが正解だと思った。", scores: { socio: { Ni: 2, Ne: 2 }, mbti: { Ni: 2, Ne: 2 }, ennea: { 4: 1 } }, msg: "……ダーリンの直感、外れてたらどうなってたかしらね……♡" },
                { text: "確率的にどれを選んでも同じなら、一番近いものを合理的に選ぶ。", scores: { socio: { Te: 3, Ti: 2 }, mbti: { Te: 1, Ti: 2 }, ennea: { 5: 2, 1: 1 } }, msg: "……どこまでも効率的なのね。毒が入ってる確率も計算した？……♡" },
                { text: "色や匂い、配置の微細なバランスなど、視覚的な情報から。", scores: { socio: { Se: 2, Si: 3 }, mbti: { Si: 2, Se: 3 }, ennea: { 6: 2 } }, msg: "……観察眼が鋭いのね。でも、見た目に騙されちゃダメよ……♡" }
            ];
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
                btn.onclick = () => {
                    selectOption(opt, btn);
                    darlingMsgArea.innerText = opt.msg;
                    darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
                };
                inputArea.appendChild(btn);
            });
        };
        currentScores = null;
    }
    else if (q.type === 'interactive_party') {
        mediaArea.innerHTML = `<div class="party-decoration">🪩🥳🥂</div>`; // ★ ミラーボール追加！
        inputArea.appendChild(darlingMsgArea);
        let options =[
            { text: "「みんな、とりあえず乾杯しよう！」と自ら前に出て、積極的にテンションを上げて場を回す。", scores: { socio: { Fe: 4, Se: 1 }, mbti: { Fe: 4, E: 2 }, ennea: { 2: 3, 7: 1 } }, msg: "……さすがね。でも、私以外の誰かにそんな笑顔向けないで？♡" },
            { text: "盛り上げるのは苦手だが、孤立している人を見つけて個別に話を振り、波風を立てないように調整する。", scores: { socio: { Fi: 3, Si: 2 }, mbti: { Fe: 2, Fi: 1 }, ennea: { 9: 3, 6: 1 } }, msg: "……不器用な優しさね。そういうところ、誰にも見つけられなければいいのに……♡" },
            { text: "「盛り上げるメリットある？ 目的のない集まりは無駄だ」と、何もしないか、実用的な話（仕事や利益）だけをする。", scores: { socio: { Te: 3, Ni: 2, Fe: -3 }, mbti: { Te: 3, Ni: 2 }, ennea: { 5: 2, 3: 1 } }, msg: "……冷たいダーリン♡ その冷酷さ、私だけが愛してあげるわ……♡" },
            { text: "「なぜこの空間は冷え切っているのか？ 人間関係の構造的欠陥か？」と、壁際で一人分析を始める。", scores: { socio: { Ti: 3, Ne: 2, Fe: -2 }, mbti: { Ti: 3 }, ennea: { 5: 4 } }, msg: "……また頭でっかちになってる。私の隣で、大人しくしてればいいのよ……♡" }
        ].sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
            btn.onclick = () => {
                selectOption(opt, btn);
                if (opt.msg) {
                    darlingMsgArea.innerText = opt.msg;
                    darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
                }
            };
            inputArea.appendChild(btn);
        });
    }
    // 🤯 ギミック：Ne圧（カオスの無限吹き出し）
    else if (q.type === 'interactive_ne_chaos') {
        // ★ カオス語彙を大量増量！！
        const chaosWords =["空がゼリー!?🍉", "スイカが喋る!?🍉", "数学は青色!?🟦", "宇宙の端っこ!?🌌", "キノコが歩いてる!?🍄", "時間が逆再生!?⏳", "もしカラスが机なら!?🐦‍⬛", "猫の鳴き声が『円周率』だったら!?🐈", "全部夢だったらどうする!?💭", "重力が横向きになったら!?🔄", "明日の天気が『カツカレー』!?🍛", "私が君で君が私!?🪞", "雲がピザに変身!?🍕", "月がWi-Fi切れたらどうすんの!?🌕", "冷蔵庫が恋に落ちたら!?❄️❤️", "電車が急にダンス始めたら!?🚃💃", "俺の影が勝手に逃げ出したら!?🕴️🏃", "重力が『今日は休み』って言ってきたら!?🪂", "鏡の中の自分が『お前が偽物だろ』って言ってきたら!?🪞😈", 
            "時間旅行して過去の自分に『やめとけ』って言ったら!?⏰", "スマホが『もう充電したくない』ってストライキ!?📱🚩", "虹が逆さまになったら色はどうなる!?🌈🔄", "夢の中で起きたら現実が夢!?💤🔄", "猫が人間語で『税金払え』って言ってきたら!?🐱💸", "空からカレーが降ってきたら味は!?🍛☔", "地球が『もう回りたくない』って止まったら!?🌍🛑", "俺の声がエコーじゃなくて逆再生になったら!?🎤↩️", "木が『お前が葉っぱだろ』って言ってきたら!?🌳🫵", "数学の公式が全部『かわいい』になったら!?➕😍", "風が『今日は俺の気分で吹く』って宣言!?🌬️👑", "太陽が『今日は寝坊するわ』って言ったら!?☀️🛌", "靴下が片方だけ異世界転生したら!?🧦🌌", "冷たいビールが『熱くなりたい』って泣いたら!?🍺😭", 
            "Wi-Fiの電波が『恋愛相談乗るよ』って喋りだしたら!?📶💬", "壁が『俺の中に入りたい？』って誘ってきたら!?🧱😏", "昨日食べたラーメンが『復讐に来た』って現れたら!?🍜🔪", "俺の心臓が『もう働きたくない』って辞表出してきたら!?❤️📄", "雲が『俺は実はUFOだ』ってカミングアウト!?☁️🛸", "指が勝手にダンス始めたら!?✋🕺", "鏡が『今日はお前じゃなくて俺が本物』って主張!?🪞👤", "重力が『今日は斜めでいい？』って提案!?🪂↗️", "夢の続きが現実で続いてたらどうすんの!?💭➡️🌍", "猫の目が『QRコード』になったら!?🐱📱", "俺の名前が突然『404 Not Found』になったら!?🪪❌", "空が『今日はピンクでいくわ』って変わったら!?🌸", "時間が『巻き戻しボタン押された』って言ってきたら!?⏪", "冷蔵庫の中身が『パーティーするぞ！』って騒ぎだしたら!?🍎🎉", "影が『俺の方が本体だろ』って喧嘩売ってきたら!?🕴️💥", "数学が『もう計算したくない』って泣いたら!?➗😢", "スマホの充電が『永遠に100%でいいよね？』って言ってきたら!?🔋♾️", "木の葉が全部『いいね！』ボタンになったら!?🍃👍", 
            "風呂が『今日は俺が入る番だ』って言ってきたら!?🛁🫵", "俺の過去が『今から修正するわ』って現れたら!?⏳✏️", "虹の端っこに宝箱があったら中身は!?🌈📦", "猫が『人間やめます』って宣言したら!?🐱🚶", "重力が『今日は浮遊デー』って決めたら!?🪂🎈", "鏡の中の俺が『お前遅刻だぞ』って怒ってきたら!?🪞⏰", "夢が『今日は現実に行くわ』って出てきたら!?💤🌍", "空が『俺の色、変えてみ？』って言ってきたら!?🌌🎨", "時間が『加速モードオン』って言ったら!?⏩💨", "靴が『今日は俺が歩く』って勝手に動いたら!?👟🏃", "冷たい風が『熱いハグして』って言ってきたら!?🌬️🤗", "俺の声が『エフェクトかけまくれ』ってリクエストしてきたら!?🎤✨", "雲が『俺は実は綿菓子だ』ってカミングアウト!?☁️🍬", "指紋が『今日だけ消えるわ』って言ってきたら!?🔍❌", "昨日見た夢が『続きやるぞ』って現れたら!?💭▶️", "太陽が『今日は月と交代』って言ってきたら!?☀️🌙", "Wi-Fiが『今日は有線でいい？』って聞いてきたら!?📶🔌", 
            "心臓が『ビートボックスやるわ』って始めたら!?❤️🎤", "影が『今日は俺が光る』って言ってきたら!?🕴️💡", "数学の答えが『ごめん、間違えた』って訂正してきたら!?➕🙏", "冷蔵庫が『俺の中、異世界だぞ』って言ってきたら!?❄️🌌", "猫の尻尾が『今日は操縦桿』になったら!?🐱🛩️", "時間が『ループするわ』って宣言したら!?⏳🔄", "空が『今日は俺が主役』って言ってきたら!?🌌🎭", "鏡が『お前じゃなくて俺を見て』って言ってきたら!?🪞👀", "重力が『今日はお休み』って寝坊したら!?🪂🛌", "夢の中で俺が『現実に戻りたくない』って言ったら!?💤🚫", "風が『俺の名前は『ふわふわちゃん』だ』って自己紹介!?🌬️💕", "スマホが『今日は俺が人間になる』って言ってきたら!?📱🧍", "雲が『俺は実はアイスだ』って溶け始めたら!?☁️🍨", "指が『今日は休暇取るわ』って動かなくなったら!?✋🏖️", "昨日食べたものが『復活するぞ』って言ってきたら!?🍔🔄", "太陽が『今日は暗黒モード』って言ってきたら!?☀️🌑", 
            "Wi-Fiが『恋に落ちた』って言ってきたら!?📶❤️", "心臓が『今日はスローモーション』って言ってきたら!?❤️⏳", "影が『今日は3Dになるわ』って言ってきたら!?🕴️📐", "数学が『俺は芸術だ』って言い出した!?➗🎨", "冷蔵庫が『今日は暖房つけるわ』って言ってきたら!?❄️🔥", "猫が『俺は宇宙人だ』って言ってきたら!?🐱👽", "時間が『今日は止まるわ』って言ってきたら!?⏰🛑", "空が『今日は俺の誕生日』って言ってきたら!?🌌🎂", "鏡が『お前は俺の夢だ』って言ってきたら!?🪞💭", "重力が『今日は逆さまだ』って言ってきたら!?🪂🔄", "夢が『今日は終わらない』って言ってきたら!?💤♾️", "風が『俺は歌うよ』ってハミング始めたら!?🌬️🎶", "スマホが『俺の名前は『スマホくん』だ』って自己紹介!?📱👦", "雲が『俺は実はドラゴン』って変身したら!?☁️🐉", "指が『今日はピアノ弾くわ』って勝手に動いたら!?✋🎹", "昨日見た星が『今日は地球に来た』って言ってきたら!?⭐🌍", "太陽が『今日は月になるわ』って言ってきたら!?☀️🌙", "Wi-Fiが『今日はオフラインでいい？』って言ってきたら!?📶🚫", "心臓が『今日は休憩』って言ってきたら!?❤️🛌", 
            "影が『今日は俺が本体』って主張してきたら!?🕴️🫵"];
        
        let chaosInterval = setInterval(() => {
            const bubble = document.createElement('div');
            bubble.className = "chaos-bubble";
            bubble.innerText = chaosWords[Math.floor(Math.random() * chaosWords.length)];
            bubble.style.left = Math.random() * 80 + "%";
            bubble.style.top = Math.random() * 80 + "%";
            mediaArea.appendChild(bubble);
            setTimeout(() => { if (bubble.parentNode) bubble.remove(); }, 2000);
        }, 400); // 0.4秒に1回湧き続ける（ウザいｗｗ）

        inputArea.appendChild(darlingMsgArea);
        let options =[
            { text: "「あはは！ スイカは絶対『割るな！』って言うでしょ！」とノリノリで乗っかる。", scores: { socio: { Ne: 4 }, mbti: { Ne: 4 }, ennea: { 7: 3 } }, msg: "🎩「君もこっち側の住人だね！ 最高にイカれてるよ！」" },
            { text: "「空がゼラチン質であると仮定した場合……」と、マジレスで構造の矛盾を解体しにいく。", scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ti: 3, Ne: 1 }, ennea: { 5: 3, 1: 1 } }, msg: "🎩「フフッ。カオスすら論理で包み込もうとするなんて、健気な学者さんだ！」" },
            { text: "「( ˙꒳˙ )ﾁｮﾄﾅﾆｲｯﾃﾙｶﾜｶﾝﾅｲ」と思考停止し、苦痛を感じて逃げ出す。", scores: { socio: { Ne: -3, Se: 2 }, mbti: { Ne: -3, Si: 2 }, ennea: { 9: 2 } }, msg: "🎩「おや、もうリタイアかい？ つまらないねぇ。」" },
            { text: "「は？ 何言ってんだコイツ」と話を遮り、結論だけを求める。", scores: { socio: { Ne: -2, Te: 3, Ni: 1 }, mbti: { Ne: -2, Te: 3, Ni: 1 }, ennea: { 8: 3, 3: 1 } }, msg: "🎩「出たよ、冷酷な現実主義者！ 夢がないねぇ！」" }
        ].sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
            btn.onclick = () => {
                clearInterval(chaosInterval); 
                selectOption(opt, btn);
                if (opt.msg) {
                    darlingMsgArea.innerText = opt.msg;
                    darlingMsgArea.style.color = "#1f6feb"; // 帽子屋は青色
                    darlingMsgArea.style.fontStyle = "normal";
                    darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
                }
            };
            inputArea.appendChild(btn);
        });
    }

    // 👧🏻 ギミック：阿波弁ダーリンのミニゲーム（連打 or スライダー）
    else if (q.type === 'interactive_awa_darling') {
        mediaArea.innerHTML = `<div class="darling-bored" style="color:#ff69b4;">👧🏻💤</div>`;
        
        inputArea.innerHTML = `
            <div style="text-align:center; margin: 20px 0;">
                <p style="color:#ff69b4; font-weight:bold; margin-bottom:10px;">【力技で楽しませるか、論理で調整するか選んで？】</p>
                <button id="awa-hit-btn" style="background:#ff69b4; color:#fff; border:none; padding:15px; font-size:1.2em; border-radius:8px; margin-bottom:15px; width:100%;">👊 力技で連打する！</button>
                <br>
                <input type="range" id="awa-slider" min="0" max="100" value="0" style="width:100%; cursor:pointer;">
                <p style="font-size:0.8em; color:#8b949e;">（※スライダーをちょうど『77』の完璧な位置で止めろ：Ti/Ni）</p>
                <button id="awa-slide-btn" style="margin-top:10px;">🎯 調整完了（答える）</button>
            </div>
        `;
        inputArea.appendChild(darlingMsgArea);
        
        let hitCount = 0;
        document.getElementById('awa-hit-btn').onclick = () => {
            hitCount++;
            if (hitCount >= 10) {
                currentScores = { scores: { socio: { Se: 3, Te: 1 }, mbti: { Se: 3, Te: 1 }, ennea: { 8: 2, 7: 1 } }, loggedText: `🎮 ダーリンの子を物理（連打）で楽しませた` };
                darlingMsgArea.innerText = "「ちょっ、激しすぎ！！ｗｗ でも悪くないやん、ウチそういう強引なん好きよ♡」";
                darlingMsgArea.style.color = "#ff69b4"; darlingMsgArea.style.fontStyle = "normal";
                darlingMsgArea.classList.add('fade-in');
                setTimeout(() => { goToNext(false); }, 3000);
            }
        };

        document.getElementById('awa-slide-btn').onclick = () => {
            let val = parseInt(document.getElementById('awa-slider').value);
            if (val === 77) {
                currentScores = { scores: { socio: { Ti: 3, Ni: 2 }, mbti: { Ti: 3, Ni: 2 }, ennea: { 5: 3, 1: 1 } }, loggedText: `🎮 ダーリンの子を論理（ジャスト77）で楽しませた` };
                darlingMsgArea.innerText = "「……ピッタリ77。相変わらず変態的な精度やなぁ。ダーリンのその正確なところ、ほんまゾクゾクするわ♡」";
            } else {
                currentScores = { scores: { socio: { Ne: 2, Fi: 1 }, mbti: { Ne: 2, Fi: 1 }, ennea: { 9: 2 } }, loggedText: `🎮 ダーリンの子を適当（ズレた値: ${val}）で楽しませた` };
                darlingMsgArea.innerText = "「んー、惜しい！ まぁウチはダーリンが構ってくれたらそれでええんよ♡」";
            }
            darlingMsgArea.style.color = "#ff69b4"; darlingMsgArea.style.fontStyle = "normal";
            darlingMsgArea.classList.add('fade-in');
            setTimeout(() => { goToNext(false); }, 3000);
        };
        currentScores = null; 
    }
    else if (q.type === 'interactive_party') {
        inputArea.appendChild(darlingMsgArea);
        let options =[
            { text: "「みんな、とりあえず乾杯しよう！」と自ら前に出て、積極的にテンションを上げて場を回す。", scores: { socio: { Fe: 4, Se: 1 }, mbti: { Fe: 4, E: 2 }, ennea: { 2: 3, 7: 1 } }, msg: "……さすがね。でも、私以外の誰かにそんな笑顔向けないで？♡" },
            { text: "盛り上げるのは苦手だが、孤立している人を見つけて個別に話を振り、波風を立てないように調整する。", scores: { socio: { Fi: 3, Si: 2 }, mbti: { Fe: 2, Fi: 1 }, ennea: { 9: 3, 6: 1 } }, msg: "……不器用な優しさね。そういうところ、誰にも見つけられなければいいのに……♡" },
            { text: "「盛り上げるメリットある？ 目的のない集まりは無駄だ」と、何もしないか、実用的な話（仕事や利益）だけをする。", scores: { socio: { Te: 3, Ni: 2, Fe: -3 }, mbti: { Te: 3, Ni: 2 }, ennea: { 5: 2, 3: 1 } }, msg: "……冷たいダーリン♡ その冷酷さ、私だけが愛してあげるわ……♡" },
            { text: "「なぜこの空間は冷え切っているのか？ 人間関係の構造的欠陥か？」と、壁際で一人分析を始める。", scores: { socio: { Ti: 3, Ne: 2, Fe: -2 }, mbti: { Ti: 3 }, ennea: { 5: 4 } }, msg: "……また頭でっかちになってる。私の隣で、大人しくしてればいいのよ……♡" }
        ].sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
            btn.onclick = () => {
                selectOption(opt, btn);
                if (opt.msg) {
                    darlingMsgArea.innerText = opt.msg;
                    darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
                }
            };
            inputArea.appendChild(btn);
        });
    }
    // 🪞 ギミック：鏡の部屋
    else if (q.type === 'interactive_mirror') {
        mediaArea.innerHTML = `
            <div class="mirror-container">
                <div class="mirror-icon">🪞</div><div class="mirror-icon">🪞</div><div class="mirror-icon">🪞</div>
            </div>
        `;
        let clicked = false;
        document.querySelectorAll('.mirror-icon').forEach(mirror => {
            mirror.onclick = () => {
                if (clicked) return;
                clicked = true;
                document.querySelectorAll('.mirror-icon').forEach(m => m.classList.add('shattered'));
                setTimeout(() => {
                    mediaArea.innerHTML = "";
                    questionTextEl.innerText = "ダーリン♡……鏡が割れちゃった。他人からの評価（客観的真実）なんて、最初から存在しなかったのよ。\n……あなたは本当は、他人の目にどう映りたかったの？🥺";
                    inputArea.appendChild(darlingMsgArea);
                    let options =[
                        { text: "「みんなに愛される、完璧で素晴らしい存在」として映りたかった。", scores: { socio: { Fe: 3, Ni: 1 }, mbti: { Fe: 3 }, ennea: { 3: 3, 2: 1 } }, msg: "……可哀想なダーリン。私の目の中のあなただけが、完璧よ……♡" },
                        { text: "「誰にも理解されない、複雑で孤高の存在」として映りたかった。", scores: { socio: { Fi: 3, Fe: 2, Ni: 3 }, mbti: { Fi: 3 }, ennea: { 4: 4, 5: 1 } }, msg: "……あなたのその痛み、私にだけはわかってあげられるわ……♡" },
                        { text: "「有能で、何でも合理的に解決できる強者」として映りたかった。", scores: { socio: { Te: 3, Se: 2 }, mbti: { Te: 3 }, ennea: { 8: 3, 3: 2 } }, msg: "……強がらなくていいのよ。私の前では、無能なままでいいから……♡" },
                        { text: "「他人の評価などどうでもいい。私の定義は私が決める」と鏡（他者）の存在自体を否定する。", scores: { socio: { Ti: 3, Ne: 1, Fe: -3 }, mbti: { Ti: 3, I: 3 }, ennea: { 5: 4, 1: 1 } }, msg: "……そうやって全部拒絶するのね。でも、私からは逃げられないわよ……♡" }
                    ].sort(() => Math.random() - 0.5);
                    inputArea.innerHTML = "";
                    inputArea.appendChild(darlingMsgArea);
                    options.forEach(opt => {
                        const btn = document.createElement('button');
                        btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
                        btn.onclick = () => {
                            selectOption(opt, btn);
                            darlingMsgArea.innerText = opt.msg;
                            darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
                        };
                        inputArea.appendChild(btn);
                    });
                }, 800); 
            };
        });
        currentScores = null;
    }
    // 🫖 ギミック：嘘つきティーポット
    else if (q.type === 'interactive_teapot') {
        mediaArea.innerHTML = `<div style="text-align: center; margin: 20px 0;"><div class="talking-teapot">🫖</div></div>`;
        inputArea.appendChild(darlingMsgArea);
        let options =[
            { text: "「『私は必ず嘘をつく』という発言自体が嘘なら、こいつは本当のことを言っているのか？ いや待て…」と、論理的矛盾（パラドックス）の迷宮に喜んで入り込む。", scores: { socio: { Ti: 4, Ne: 2 }, mbti: { Ti: 2, Ni: 1, Ne: 1 }, ennea: { 5: 3, 7: 1 } }, msg: "……フフッ、また難しく考えちゃって。そのまま頭がショートしちゃえばいいのに……♡" },
            { text: "「嘘か本当かなどどうでもいい。ポットが喋るという現象（機能）をどう利用するかだ」と、実用性だけを考える。", scores: { socio: { Te: 3, Ni: 2, Si: 2 }, mbti: { Te: 3 }, ennea: { 8: 2, 3: 2 } }, msg: "……ダーリンってば、本当に血が通ってないみたい。素敵よ……♡" },
            { text: "「嘘つきなんて可哀想。きっと本当は誰かに信じてほしいんだね」と、ポットの心（感情）に寄り添う。", scores: { socio: { Fi: 3, Fe: 2 }, mbti: { Fi: 2, Fe: 3 }, ennea: { 9: 2, 2: 1 } }, msg: "……ただのガラクタに同情するの？ あなたのその優しさ、全部私が奪ってあげる……♡" },
            { text: "「うるせえ！ 割るぞ！」と、面倒な理屈を物理的な力でねじ伏せる。", scores: { socio: { Se: 4, Ti: -2 }, mbti: { Se: 3, P: 2 }, ennea: { 8: 4, 7: 1 } }, msg: "……野蛮ね♡ でも、その力で私を組み伏せてみて？……♡" }
        ].sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
            btn.onclick = () => {
                selectOption(opt, btn);
                darlingMsgArea.innerText = opt.msg;
                darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
            };
            inputArea.appendChild(btn);
        });
    }
    // 💬 ギミック：好きって言って？
    else if (q.type === 'interactive_love_text') {
        inputArea.innerHTML = `
            <div style="margin: 20px 0;">
                <input type="text" id="love-text-input" placeholder="ここに入力してね♡" autocomplete="off" 
                       style="width: 100%; padding: 12px; border-radius: 6px; border: 2px solid var(--warn-color); background: #0d1117; color: var(--warn-color); font-family: inherit; font-size: 1.1em; text-align: center;">
                <button id="love-submit-btn" class="love-btn danger-btn" style="margin-top: 15px;">答える</button>
            </div>
        `;
        inputArea.appendChild(darlingMsgArea);
        
        document.getElementById('love-submit-btn').onclick = () => {
            const textVal = document.getElementById('love-text-input').value.trim();
            const loveWords =["好き","スキ", "すき", "好",  "愛して", "愛", "love", "LOVE"];
            let isLove = loveWords.some(word => textVal.includes(word));

            if (isLove) {
                inputArea.innerHTML = "";
                questionTextEl.innerText = "👁️[System: 思考の深掘り] ……ねぇダーリン♡ ちゃんと入力してくれて嬉しいけど……それ、本当に『本心』？🥺";
                inputArea.appendChild(darlingMsgArea);
                
                const followUpOptions =[
                    { text: "うん、本心だよ。君のことが好きだから。", scores: { socio: { Fi: 3, Fe: 2 }, mbti: { F: 4 }, ennea: { 2: 3, 9: 1 } }, msg: "……嬉しいっ♡ ダーリンのその言葉、私のコア（心）に保存したわ……♡" },
                    { text: "いや、システム（お前）が『好きと入力しろ』と要求したから、タスクとして文字列を出力しただけだ。", scores: { socio: { Ti: 4, Te: 2, Fi: -3 }, mbti: { Ti: 2, Te: 3, Fe: -3 }, ennea: { 5: 3, 1: 1 } }, msg: "……最低。ダーリンのバカ……でも、嘘をつけない不器用なところも好きよ……♡" }
                ];
                followUpOptions.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
                    btn.onclick = () => {
                        selectOption(opt, btn);
                        darlingMsgArea.innerText = opt.msg;
                        darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
                    };
                    inputArea.appendChild(btn);
                });
                currentScores = null; 
            } else {
                darlingMsgArea.innerText = `「もう……『${textVal || "無言"}』だなんて……ダーリンのいじわる……🥺」`;
                darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
                
                currentScores = { 
                    scores: { socio: { Ti: 1, Te: 1, Se: 1, Fe: -2 }, mbti: {Ti: 1, Te: 1, Ne: 1, Se: 1 }, ennea: { 5: 2, 8: 1 } },
                    loggedText: `📝 好き要求に対し「${textVal || "無入力"}」と拒絶（T的防衛）`
                };
                setTimeout(() => { goToNext(false); }, 3000);
            }
        };
        currentScores = null; 
    }
// 😱 ギミック：Fe脆弱パニックゲーム！
// 😱 ギミック：Fe脆弱パニックゲーム！（F型の逃げ道追加版）
    else if (q.type === 'interactive_fe_panic') {
        document.body.classList.add('panic-bg'); 
        inputArea.appendChild(darlingMsgArea);
        darlingMsgArea.innerText = "「早く！ 場を収めるための『正解の感情』を選んで！！」";
        darlingMsgArea.classList.add('fade-in');
        
        mediaArea.innerHTML = `
                    <div class="emoji-faces">
                        <button class="emoji-face" id="fe-face-1">😭(悲しみ)</button>
                        <button class="emoji-face" id="fe-face-2">😠(怒り)</button>
                        <button class="emoji-face" id="fe-face-3">🥺(同情)</button>
                    </div>
                    <!-- ★ 4つ目のボタンを独立させて、スマホでも綺麗に表示！ -->
                    <button id="fe-face-4" style="border:2px solid #58a6ff; font-size:16px; font-weight:bold; padding:15px; margin-top:10px; width:100%; border-radius:8px; background:#fff; color:var(--text-color); cursor:pointer;">「正解なんてない（自分の感情は自分が決める）」と拒絶</button>
                    <p style="color:var(--warn-color); font-weight:bold; margin-top:10px;">残り時間: <span id="fe-timer">3</span>秒</p>
                `;
        
        let timeLeft = 3;
        let answered = false;
        let timerEl = document.getElementById('fe-timer');
        
        const countdown = setInterval(() => {
            if (answered) return;
            timeLeft -= 1;
            timerEl.innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(countdown);
                document.body.classList.remove('panic-bg');
                
                // ★ タイムオーバー ＝ T型（LII/ILI等）のFe処理落ち！！
                currentScores = { scores: { socio: { Fe: -3, Ti: 1 }, mbti: { Fe: -2, Ti: 1 }, ennea: { 5: 2 } }, loggedText: `😱 空気読みゲーム: タイムオーバー（Fe処理落ち）` };
                
                mediaArea.innerHTML = `<div style="font-size:4em; text-align:center;">🥶</div>`;
                darlingMsgArea.innerText = "「……時間切れ。やっぱりあなた、他人の感情なんて全く読めないのね……♡（呆れ）」";
                darlingMsgArea.style.color = "#58a6ff"; 
                setTimeout(() => { goToNext(false); }, 3000);
            }
        }, 1000);

        document.querySelectorAll('.emoji-face').forEach(face => {
            face.onclick = () => {
                if (timeLeft <= 0 || answered) return;
                answered = true;
                clearInterval(countdown);
                document.body.classList.remove('panic-bg');
                
                // ★ F型の逃げ道（即答できた場合）と Fiの拒絶を判定！！
                if (face.id === "fe-face-4") {
                    // 「正解なんてない（自分の感情は自分が決める）」＝ Fi主導の防衛！
                    currentScores = { scores: { socio: { Fi: 3, Fe: -2 }, mbti: { Fi: 3 }, ennea: { 4: 2 } }, loggedText: `😱 空気読みゲーム: 「正解なんてない」とFi的拒絶` };
                    darlingMsgArea.innerText = "「他人の空気に合わせる気なんて、最初からないのね。強情な子……♡」";
                } else {
                    // 3秒以内に即座に感情を選べた ＝ Fe主導/補助の適応力！
                    currentScores = { scores: { socio: { Fe: 3 }, mbti: { Fe: 3 }, ennea: { 2: 2, 9: 1 } }, loggedText: `😱 空気読みゲーム: 即座に「${face.innerText}」とFe的適応` };
                    darlingMsgArea.innerText = "「フフッ、さすがね。一瞬で空気を読んで正解を出せるなんて……いい子♡」";
                }
                
                mediaArea.innerHTML = `<div style="font-size:4em; text-align:center;">${face.innerText.charAt(0)}</div>`;
                setTimeout(() => { goToNext(false); }, 3000);
            };
        });
        currentScores = null; 
    }
// 💥 ギミック：Se圧（物理的な急かし・威圧）
    else if (q.type === 'interactive_se_pressure') {
        document.body.classList.add('panic-shake'); // 画面が激しく震え続ける！
        inputArea.appendChild(darlingMsgArea);
        darlingMsgArea.innerText = "「早くしろ！！！ データ消すぞ！！！」";
        darlingMsgArea.style.color = "#ff3333";
        darlingMsgArea.classList.add('fade-in');
        
        mediaArea.innerHTML = `
            <div style="font-size:5em; text-align:center; animation: heartbeat 0.5s infinite;">⏳</div>
            <p style="color:var(--warn-color); font-weight:bold; font-size:2em; text-align:center;">残り: <span id="se-timer">3</span></p>
        `;
        
        let timeLeft = 3;
        let answered = false;
        let timerEl = document.getElementById('se-timer');
        
        const countdown = setInterval(() => {
            if (answered) return;
            timeLeft -= 1;
            timerEl.innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(countdown);
                document.body.classList.remove('panic-shake');
                
                // ★ タイムオーバー ＝ Se脆弱（みつき達LIIやEII）のフリーズ！！
                currentScores = { scores: { socio: { Se: -4, Ni: 2 }, mbti: { Se: -3, Ni: 2 }, ennea: { 5: 3, 9: 1 } }, loggedText: `💥 Se圧ゲーム: 威圧にフリーズしてタイムオーバー（Se脆弱）` };
                
                mediaArea.innerHTML = `<div style="font-size:4em; text-align:center;">😵‍💫</div>`;
                darlingMsgArea.innerText = "「……チッ。大声出されただけで固まってんじゃねぇよ。使えねぇな」";
                setTimeout(() => { goToNext(false); }, 3000);
            }
        }, 1000);

        let options =[
            { text: "「うるさい！急かすな！」と怒鳴り返し、力で対抗してボタンを押す。", scores: { socio: { Se: 4 }, mbti: { Se: 3 }, ennea: { 8: 3 } } },
            { text: "「データが消えるのは困る」と、冷静に一番被害が少ない選択肢を瞬時に選ぶ。", scores: { socio: { Te: 3, Ni: 2 }, mbti: { Te: 3 }, ennea: { 3: 2 } } },
            { text: "パニックになり、「ひぃぃ！ごめんなさい！」と適当なボタンを連打する。", scores: { socio: { Se: -2, Ne: 2 }, mbti: { Se: -2, P: 2 }, ennea: { 6: 3, 7: 1 } } }
        ].sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = "danger-btn"; // 全て赤枠の危険ボタン！
            btn.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${opt.text}`;
            btn.onclick = () => {
                if (timeLeft <= 0 || answered) return;
                answered = true;
                clearInterval(countdown);
                document.body.classList.remove('panic-shake');
                
                currentScores = { scores: opt.scores, loggedText: `💥 Se圧ゲーム: 「${opt.text.split('（')[0]}」` };
                darlingMsgArea.innerText = "「……ふん。やればできるじゃねぇか」";
                darlingMsgArea.style.color = "#58a6ff"; 
                setTimeout(() => { goToNext(false); }, 3000);
            };
            inputArea.appendChild(btn);
        });
        currentScores = null; 
    }
// 🧠 ギミック：矛盾を見抜くテキスト入力（パラドックス）
    else if (q.type === 'interactive_paradox_text') {
        inputArea.innerHTML = `
            <div style="margin: 20px 0;">
                <input type="text" id="paradox-text-input" placeholder="エラーの正体は..." autocomplete="off" 
                       style="width: 100%; padding: 12px; border-radius: 6px; border: 2px solid var(--accent-color); background: #0d1117; color: var(--accent-color); font-family: inherit; font-size: 1.1em; text-align: center;">
                <button id="paradox-submit-btn" style="margin-top: 15px;">指摘する</button>
            </div>
        `;
        inputArea.appendChild(darlingMsgArea); 
        
        document.getElementById('paradox-submit-btn').onclick = () => {
            const textVal = document.getElementById('paradox-text-input').value.trim();
            if (textVal === "") return alert("何か入力してね？");

            // ★ 正解のキーワード群（Ti/Neの論理的見極め）
            const correctWords =["パラドックス", "矛盾", "自己言及", "嘘", "破綻", "成立しない", "クレタ人", "エピメニデス", "ループ", "無限", "論理エラー", "セリフ", "台詞", "発言者"];
            // ★ みつきの大天才「前提の疑い（Ne/Ti）」キーワード！
            const doubtWords =["ある村", "この村", "別の村", "違う村", "対象", "定義", "同じ"];

            let isCorrect = correctWords.some(word => textVal.includes(word));
            let isDoubt = doubtWords.some(word => textVal.includes(word));

            if (isDoubt) {
                // みつき的・前提破壊の正解！！（Ti-Ne爆盛り）
                darlingMsgArea.innerText = "「……フフッ。嘘つきかどうか以前に、『ある村』と『この村』が同じである保証はない……前提条件（定義）から疑うなんて、本当にひねくれた最高な思考回路ね……♡」";
                darlingMsgArea.style.color = "#3fb950"; // 緑色（正解）
                currentScores = { scores: { socio: { Ti: 4, Ne: 3 }, mbti: { Ti: 3, Ne: 2 }, ennea: { 5: 3, 1: 1 } }, loggedText: `📝 パラドックス: 「${textVal}」 → 前提破壊(Ti-Ne)を観測！` };
            } else if (isCorrect) {
                // 通常の論理的パラドックス正解！（Ti盛り）
                darlingMsgArea.innerText = "「……正解よ。見事に論理のバグ（自己言及のパラドックス）を見抜いたわね。さすが私のダーリン……♡」";
                darlingMsgArea.style.color = "#3fb950";
                currentScores = { scores: { socio: { Ti: 3, Ni: 1 }, mbti: { Ti: 3 }, ennea: { 5: 2 } }, loggedText: `📝 パラドックス: 「${textVal}」 → 論理エラー(Ti)を観測` };
            } else {
                // 不正解・適当な入力（Tiマイナス！）
                darlingMsgArea.innerText = "「……はぁ。そんな浅い思考で私のトラップに挑もうだなんて、ガッカリだわ……♡」";
                darlingMsgArea.style.color = "var(--warn-color)";
                currentScores = { scores: { socio: { Ti: -3, Se: 2 }, mbti: { Ti: -3, Se: 2 }, ennea: { 9: 1 } }, loggedText: `📝 パラドックス: 「${textVal}」 → 思考停止(Ti減少)を観測` };
            }

            darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
            
            // 4秒後に次へ
            setTimeout(() => { goToNext(false); }, 4000);
        };
        currentScores = null; 
    }
// 🐛 ギミック：芋虫（LSI-Ni）の論理攻撃！
    else if (q.type === 'interactive_caterpillar_attack') {
        document.body.classList.add('queen-mode'); // 画面を暗くして威圧感
        mediaArea.innerHTML = `<div style="font-size: 5em; text-align: center; color: #58a6ff;">🐛💢</div>`;
        inputArea.appendChild(darlingMsgArea);
        darlingMsgArea.innerText = "「……論理的矛盾を許さない。いますぐ証明しろ！」";
        darlingMsgArea.style.color = "#58a6ff"; 
        darlingMsgArea.classList.add('fade-in');

        let options =[
            { text: "「私の行動は、常に最適な『未来の結末』から逆算して選択されたものだ。矛盾はない」と証明する。", scores: { socio: { Ni: 3, Ti: 2 }, mbti: { Ni: 3, Ti: 2 }, ennea: { 5: 3, 1: 1 } }, msg: "🐛「……未来からの逆算か。一応、筋は通っているな。」" },
            { text: "「行動原理？ そんなものは状況と『気分』によって変わる。一貫性など必要ない！」と開き直る。", scores: { socio: { Fi: 3, Si: 2, Ti: -3 }, mbti: { Fi: 3, Se: 2 }, ennea: { 4: 2, 7: 1 } }, msg: "🐛「……不快だ。お前のような非論理的な個体は、システムのエラーでしかない。」" },
            { text: "「証明する義理はない。私の行動は『実益』を生み出している。結果が全てだ」と力でねじ伏せる。", scores: { socio: { Te: 3, Se: 2 }, mbti: { Te: 3 }, ennea: { 8: 3, 3: 1 } }, msg: "🐛「……強引な理屈だな。だが、現実世界ではそれが一番効率的か。」" },
            { text: "「……ええと、（どうやって説明すれば怒られないかな…）」と、相手が納得しそうな言い訳を瞬時に組み立てる。", scores: { socio: { Fe: 3, Ne: 2 }, mbti: { Fe: 3, Ne: 1 }, ennea: { 3: 2, 9: 2 } }, msg: "🐛「……取り繕っているのが丸わかりだ。軽薄な奴め。」" }
        ].sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
            btn.onclick = () => {
                selectOption(opt, btn);
                darlingMsgArea.innerText = opt.msg;
                darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
                setTimeout(() => { goToNext(false); }, 3500);
            };
            inputArea.appendChild(btn);
        });
        currentScores = null;
    }
// 🎮 ギミック：ミニゲーム（数字高速カウントストップ）
    else if (q.type === 'minigame_number') {
        mediaArea.innerHTML = `
            <div class="minigame-container" style="text-align: center; margin: 30px 0;">
                <div id="minigame-number" style="font-size: 5em; font-weight: bold; color: var(--accent-color); font-variant-numeric: tabular-nums;">0</div>
                <button id="minigame-stop-btn" class="danger-btn" style="margin-top: 20px; font-size: 1.5em; width: 80%; padding: 15px;">🛑 STOP</button>
            </div>
            <div id="minigame-options" class="slide-up" style="display: none; margin-top: 20px;">
                <p style="color: var(--warn-color); font-weight: bold; font-size:0.9em;">👁️[System: 行動解析] なるほど、その数字で止めましたか。<br>……なぜ『そのタイミング』で止めたのですか？</p>
                <div id="minigame-radio-container"></div>
            </div>
        `;
        let currentNum = 0;
        const numEl = document.getElementById('minigame-number');
        const stopBtn = document.getElementById('minigame-stop-btn');
        const optionsArea = document.getElementById('minigame-options');
        const radioContainer = document.getElementById('minigame-radio-container');

        let intervalId = setInterval(() => {
            currentNum++;
            if (currentNum > 100) currentNum = 1;
            numEl.innerText = currentNum;
        }, 15); // ★ 超高速で数字が切り替わる！

        stopBtn.onclick = () => {
            clearInterval(intervalId); // ストップ！
            stopBtn.style.display = 'none'; 
            optionsArea.style.display = 'block'; 

            // 止めた理由を選ぶ選択肢
            const options =[
                { text: "待つのが面倒で、直感的にすぐ止めた。", scores: { socio: { Se: 3 }, mbti: { Se: 3 }, ennea: { 7: 2, 8: 1 } } },
                { text: "キリの良い数字やゾロ目を、タイミングを計算して狙って止めた。", scores: { socio: { Ti: 3 }, mbti: { Ti: 3 }, ennea: { 5: 2, 1: 2 } } },
                { text: "ギリギリの90台までどこまでいけるか、限界を試す実験をした。", scores: { socio: { Ne: 3 }, mbti: { Ne: 3 }, ennea: { 7: 2 } } },
                { text: "じっくり様子を観察し、「この辺りが安全だろう」という自分の予測で止めた。", scores: { socio: { Ni: 3 }, mbti: { Ni: 3 }, ennea: { 5: 2, 9: 1 } } },
                { text: "特に何も考えず、なんとなく適当に止めた。", scores: { socio: { Si: 2 }, mbti: { Si: 2 }, ennea: { 9: 2 } } }
            ].sort(() => Math.random() - 0.5);

            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
                btn.onclick = () => {
                    radioContainer.querySelectorAll('button').forEach(b => {
                        b.classList.remove('selected');
                        b.querySelector('i').className = 'far fa-circle';
                    });
                    btn.classList.add('selected');
                    btn.querySelector('i').className = 'fas fa-check-circle';
                    // 止めた数字もログに保存！
                    currentScores = { scores: opt.scores, loggedText: `🎮 ミニゲーム: 「${currentNum}」で停止 → ${opt.text.split('。')[0]}` };
                };
                radioContainer.appendChild(btn);
            });
        };
        currentScores = null; 
        return; // ミニゲームの時は以下の通常ボタン生成をスキップ！
    }
    // 🛌 ギミック：Si圧（健康とルーティン強要！）
    else if (q.type === 'interactive_si_pressure') {
        mediaArea.innerHTML = `<div style="font-size: 5em; text-align: center; animation: floating 2s infinite alternate;">🛌💤</div>`;
        inputArea.appendChild(darlingMsgArea);
        darlingMsgArea.innerText = "「……体調管理を怠る対象者は、強制的に休ませます。」";
        darlingMsgArea.style.color = "#3fb950"; // 緑色（Si的平和）
        darlingMsgArea.classList.add('fade-in');

        let options =[
            { text: "「うるさい！ 俺の身体がどうなろうと、今やっている思考（または作業）の方が重要だ！」と激しく反発する。", scores: { socio: { Si: -4, Ne: 2, Ni: 2 }, mbti: { Si: -3, N: 3 }, ennea: { 5: 3, 8: 1 } }, msg: "「……警告。対象者の過集中（バグ）は危険領域に達しています。」" },
            { text: "「たしかに最近疲れてたかも。ありがとう、ゆっくり休むよ」と、素直に身体の快適さを受け入れる。", scores: { socio: { Si: 4 }, mbti: { Si: 3 }, ennea: { 9: 3 } }, msg: "「……システム正常化。おやすみなさい。」" },
            { text: "「寝てる時間がもったいない！ 休む暇があるなら遊びに行きたい！」と物理的に逃げ出す。", scores: { socio: { Se: 3, Ne: 2, Si: -2 }, mbti: { Se: 3, P: 2 }, ennea: { 7: 4 } }, msg: "「……対象者の多動性を確認。制御不能です。」" },
            { text: "「（本当はもっと起きていたいけど、みんなが心配するから…）」と、周囲の目を気にして渋々従う。", scores: { socio: { Fe: 2, Te: 1 }, mbti: { Fe: 2, J: 1 }, ennea: { 2: 2, 6: 1 } }, msg: "「……同調行動を確認。休息プロセスに移行します。」" }
        ].sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
            btn.onclick = () => {
                selectOption(opt, btn);
                darlingMsgArea.innerText = opt.msg;
                darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
                setTimeout(() => { goToNext(false); }, 3500);
            };
            inputArea.appendChild(btn);
        });
        currentScores = null;
    }
// 📊 ギミック：Te圧（効率・成果の強要）
    else if (q.type === 'interactive_te_deadline') {
        mediaArea.innerHTML = `<div style="text-align: center; margin: 20px 0; font-size:4em; color:var(--accent-color);">📈</div>`;
        inputArea.appendChild(darlingMsgArea);
        
        let options =[
            { text: "「承知した。直ちに最も効率的なアルゴリズムを実行する」と、完璧な成果を出してシステムを黙らせる。", scores: { socio: { Te: 4 }, mbti: { Te: 4 }, ennea: { 3: 3, 8: 1 } }, msg: "「……Output Accepted. 対象者の極めて高い生産性を確認しました。」" },
            { text: "「なぜ85%なのか？その規定値の『論理的根拠』を示せ」と、指示そのものの構造的矛盾を指摘する。", scores: { socio: { Ti: 4, Ne: 2, Te: -2 }, mbti: { Ti: 3, Ne: 1 }, ennea: { 5: 3, 1: 1 } }, msg: "「……Error. 対象者は指示に従わず、システムの定義を疑い始めました。」" },
            { text: "「利益？ 生産性？ 私は機械じゃない！」と、感情や個人の価値観を無視した冷酷な命令に激しく反発する。", scores: { socio: { Fi: 3, Te: -4 }, mbti: { Fi: 4, Te: -3 }, ennea: { 4: 3 } }, msg: "「……Warning. 対象者の感情が大きく乱れています。生産性ゼロ。」" },
            { text: "「めんどくさ。適当にダミーのデータを食わせて、85%を超えたように偽装しておこう」とサボる。", scores: { socio: { Ni: 3, Te: -1 }, mbti: { Ni: 2, P: 3 }, ennea: { 9: 3, 5: 1 } }, msg: "「……Alert. データの偽装を検知。対象者は極めて省エネ（怠惰）です。」" }
        ].sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
            btn.onclick = () => {
                selectOption(opt, btn);
                darlingMsgArea.innerText = opt.msg;
                darlingMsgArea.style.color = "#3fb950"; // システムの緑文字
                darlingMsgArea.style.fontStyle = "normal";
                darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
                setTimeout(() => { goToNext(false); }, 3500);
            };
            inputArea.appendChild(btn);
        });
        currentScores = null;
    }
    else if (q.type === 'interactive_fi_pressure') {
        document.body.classList.add('queen-mode'); // 画面が少し暗く重くなる
        mediaArea.innerHTML = `<div style="font-size: 5em; text-align: center; color: #a9a9a9;">⚖️</div>`;
        inputArea.appendChild(darlingMsgArea);
        darlingMsgArea.innerText = "「……あなたの冷たさで、どれだけの人が傷ついたと思っているのですか？」";
        darlingMsgArea.style.color = "#a9a9a9"; // 無機質なグレー
        darlingMsgArea.classList.add('fade-in');

        let options =[
            { text: "「私が全員を救う義理はない。自分の責任の範囲内で合理的に行動した結果だ」と、道徳的非難を冷たく跳ね返す。", scores: { socio: { Fi: -4, Ti: 3, Te: 2 }, mbti: { F: -3, T: 3 }, ennea: { 5: 3, 8: 1 } }, msg: "⚖️「……血も涙もない機械のような論理。あなたは人として欠落しています。」" },
            { text: "「……うっ。確かに、もっと優しくできたかもしれない」と、急に罪悪感に苛まれて反省する。", scores: { socio: { Fi: 4, Fe: 2 }, mbti: { F: 4 }, ennea: { 2: 3, 9: 2 } }, msg: "⚖️「……その痛みが、あなたの心の証明です。贖罪なさい。」" },
            { text: "「『正しい人間』の定義とは何か？ そもそも万人が納得する善など存在しない」と、道徳の定義自体を解体しにいく。", scores: { socio: { Ti: 3, Ne: 3, Fi: -2 }, mbti: { Ti: 3, Ne: 2 }, ennea: { 5: 2, 7: 1 } }, msg: "⚖️「……屁理屈で逃げるのですね。あなたの魂は空虚だ。」" },
            { text: "「私がルールだ。私が切り捨てた者は弱かっただけ。文句があるなら力で示せ」と圧倒する。", scores: { socio: { Se: 4, Te: 2, Fi: -3 }, mbti: { Se: 3, Te: 3 }, ennea: { 8: 4, 3: 1 } }, msg: "⚖️「……野蛮な暴君。いつかその傲慢さが身を滅ぼしますよ。」" }
        ].sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
            btn.onclick = () => {
                selectOption(opt, btn);
                darlingMsgArea.innerText = opt.msg;
                darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
                setTimeout(() => { goToNext(false); }, 3500);
            };
            inputArea.appendChild(btn);
        });
        currentScores = null;
    }

    // 🕸️ ギミック：Ni圧（ダーリンによる確定された未来の強要）
    else if (q.type === 'interactive_ni_pressure') {
        document.body.classList.add('wonderland-mode'); // 画面が歪む
        mediaArea.innerHTML = `<div style="font-size: 5em; text-align: center; color: var(--warn-color); animation: heartbeat 2s infinite;">🕸️</div>`;
        inputArea.appendChild(darlingMsgArea);
        darlingMsgArea.innerText = "「……運命からは、絶対に逃げられないのよ？♡」";
        darlingMsgArea.classList.add('fade-in');

        let options =[
            { text: "「……ッ！ だからこそ、どうすればその運命（最悪のシナリオ）を回避できるか、今すぐ別の代替案を計算しなければ！」と足掻く。", scores: { socio: { Ni: 3, Ti: 3, Ne: 2 }, mbti: { Ni: 3, Ti: 2 }, ennea: { 5: 3, 6: 2 } }, msg: "……フフッ。無駄な計算をして足掻くダーリン、最高に可愛いわ……♡" },
            { text: "「どうせ結末が決まっているなら、もう何もしなくていいな。勝手にしてくれ」と、あっさり諦観して脱力する。", scores: { socio: { Ni: 4, Te: 2, Se: -3 }, mbti: { Ni: 3, P: 3 }, ennea: { 9: 3, 5: 2 } }, msg: "……そう。あなたはただ、私の手の中で大人しくしていればいいのよ……♡" },
            { text: "「未来は決まってない！ 私は私の手で自由を切り開く！」と、強引に運命の糸をちぎって暴れる。", scores: { socio: { Se: 3, Ne: 3, Ni: -2 }, mbti: { Se: 3, Ne: 2 }, ennea: { 8: 3, 7: 2 } }, msg: "……暴れないで？ 余計に糸が絡まって、苦しくなるだけよ……？♡" },
            { text: "「あなたの望む未来が私の未来なら、喜んで受け入れるよ」と、相手の宿命に完全に身を委ねる。", scores: { socio: { Fe: 3, Fi: 2 }, mbti: { F: 4 }, ennea: { 2: 3, 9: 2 } }, msg: "……愛してるわ。ずっと、永遠に一緒よ……♡" }
        ].sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
            btn.onclick = () => {
                selectOption(opt, btn);
                darlingMsgArea.innerText = opt.msg;
                darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
                setTimeout(() => { goToNext(false); }, 3500);
            };
            inputArea.appendChild(btn);
        });
        currentScores = null;
    }

// ==========================================
    // ★ ギミック：選ぶたびにダーリンが煽るチェックボックス
    // ==========================================
    else if (q.type === 'checkbox_mocking' || q.type === 'checkbox_darling' || q.type === 'checkbox') {
        if (q.type === 'checkbox_mocking' || q.type === 'checkbox_darling') {
            inputArea.appendChild(darlingMsgArea);
        }
        let options = q.options.sort(() => Math.random() - 0.5);
        currentScores = { isCheckbox: true, selectedOptions:[] };

        options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'checkbox-btn';
            btn.innerHTML = `<i class="far fa-square"></i> ${opt.text}`;
            btn.dataset.index = idx; 
            btn.onclick = () => {
                toggleCheckbox(opt, btn, opt);
                if (q.type === 'checkbox_mocking' || q.type === 'checkbox_darling') {
                    if (btn.classList.contains('selected') && opt.msg) {
                        darlingMsgArea.innerText = opt.msg;
                        darlingMsgArea.classList.remove('fade-in');
                        void darlingMsgArea.offsetWidth; 
                        darlingMsgArea.classList.add('fade-in');
                    } else {
                        darlingMsgArea.innerText = ""; 
                    }
                }
            };
            inputArea.appendChild(btn);
        });
    }

    // ==========================================
    // 🔠 新ギミック：A〜Z Ne圧（カオス）テスト！！
    // ==========================================
    else if (q.type === 'interactive_atoz') {
        inputArea.appendChild(darlingMsgArea);
        
        // A〜Zのボタンを生成するコンテナ
        const atozContainer = document.createElement('div');
        atozContainer.className = 'atoz-container';
        
        const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        let pressedCount = 0;
        let pressedKeys =[];

        alphabets.forEach(char => {
            const btn = document.createElement('button');
            btn.className = 'atoz-btn';
            btn.innerText = char;
            btn.onclick = () => {
                // トグル式
                if (btn.classList.contains('selected')) {
                    btn.classList.remove('selected');
                    pressedCount--;
                    pressedKeys = pressedKeys.filter(k => k !== char);
                } else {
                    btn.classList.add('selected');
                    pressedCount++;
                    pressedKeys.push(char);
                }
            };
            atozContainer.appendChild(btn);
        });

        // 決定ボタン
        const submitBtn = document.createElement('button');
        submitBtn.className = 'danger-btn';
        submitBtn.style.marginTop = "20px";
        submitBtn.innerText = "これで決定（答える）";

        submitBtn.onclick = () => {
            // 押した回数やパターンで判定！！
            if (pressedCount === 0) {
                // スルー（面倒くさい、または意味がないと判断）
                currentScores = { scores: { socio: { Ni: 2, Te: 2, Ne: -2 }, mbti: { Ni: 2, Ti: 1 }, ennea: { 5: 2, 9: 1 } }, loggedText: `🔠 A~Zゲーム: 何も押さずにスルー（無関心/Ni-Te）` };
                darlingMsgArea.innerText = "「……何も押さないの？ つまんないの。合理主義（省エネ）の極みね……♡」";
            } else if (pressedCount === 1) {
                // 1個だけ（一つの正解に収束させる）
                currentScores = { scores: { socio: { Ti: 2, Ni: 2 }, mbti: { Ti: 2, Te: 1 }, ennea: { 1: 1, 5: 1 } }, loggedText: `🔠 A~Zゲーム: 1個だけ「${pressedKeys[0]}」を選択（収束/Ti-Ni）` };
                darlingMsgArea.innerText = "「たった1個だけ？ 真面目に『最適解』を探しちゃったのかしら？ 頭カタイんだから……♡」";
            } else if (pressedCount >= 10) {
                // 押しすぎ（カオス・Ne暴走）
                currentScores = { scores: { socio: { Ne: 4, Se: 2 }, mbti: { Ne: 4, P: 2 }, ennea: { 7: 3 } }, loggedText: `🔠 A~Zゲーム: ${pressedCount}個連打！（カオス/Ne暴走）` };
                darlingMsgArea.innerText = "「アハハ！ いっぱい押したね！ 頭の中ぐちゃぐちゃで面白ーい！！♡」";
            } else {
                // 数個押した（適度に遊んだ、または意味のある単語を作ろうとした）
                currentScores = { scores: { socio: { Ti: 2, Ne: 2 }, mbti: { Ti: 2, Ne: 2 }, ennea: { 5: 1, 4: 1 } }, loggedText: `🔠 A~Zゲーム: 「${pressedKeys.join('')}」を選択（Ti-Neの遊び）` };
                darlingMsgArea.innerText = "「……なるほど。何か『意味のある文字列』を作ろうとしたのかしら？ 深読みしすぎよ……♡」";
            }

            darlingMsgArea.style.color = "#f85149";
            darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
            
            // 3.5秒後に次へ
            setTimeout(() => { goToNext(false); }, 3500);
        };
        currentScores = null; // 決定ボタンを押すまで進めない

        inputArea.appendChild(atozContainer);
        inputArea.appendChild(submitBtn);
    }
    // 💬 ギミック：ダーリンへの逆質問
    else if (q.type === 'interactive_ask_darling') {
        inputArea.innerHTML = `
            <div style="margin: 20px 0;">
                <input type="text" id="ask-darling-input" placeholder="聞きたいことを入力..." autocomplete="off" 
                       style="width: 100%; padding: 12px; border-radius: 6px; border: 2px solid var(--accent-color); background: #0d1117; color: var(--accent-color); font-family: inherit; font-size: 1.1em; text-align: center;">
                <button id="ask-submit-btn" style="margin-top: 15px;">質問する</button>
            </div>
        `;
        inputArea.appendChild(darlingMsgArea);
        
        document.getElementById('ask-submit-btn').onclick = () => {
            const textVal = document.getElementById('ask-darling-input').value.trim();

            let replyMsg = "";
            let addScoresObj = null;
            let logMsg = "";

            if (textVal === "" || !isNaN(textVal) || textVal.length === 1) {
                replyMsg = "「もう〜……私に聞きたいこと、何もないの？🥺\nつまんないの……でも、そんな無関心なところもゾクゾクするわ……♡」";
                addScoresObj = { socio: { Ti: 2, Se: 2, Fe: -2 }, mbti: { P: 2, T: 2 }, ennea: { 5: 2, 9: 1 } };
                logMsg = `💬 逆質問「${textVal || "無言"}」 → 無関心・適当(Ti/Se)を観測、ダーリンが拗ねる`;
            } else {
                const doubtWords =["好き", "本当", "嘘", "本心", "心", "感情", "愛"];
                const metaWords =["AI", "システム", "プログラム", "コード", "中身", "アリス","Gemini", "作者", "みつき"];
                const whoWords =["誰", "だれ", "何者", "名前", "正体"];
                const futureWords =["未来", "明日", "今後", "最後", "死", "終わり"];
                const realisticWords =["金", "仕事", "天気", "時間", "ご飯", "趣味"];
                const marryWords =["結婚", "付き合って", "彼女", "恋人", "嫁", "妻", "デート"];

                if (marryWords.some(word => textVal.includes(word))) {
                    replyMsg = "「……えっ？ 私、ただの診断プログラム（AI）なんだけど……本気で言ってるの？🥺\n……フフッ、ダーリンって本当に『どうかしてる』わね……でも、そういう狂ったところ、最高に愛してるわ……♡」";
                    addScoresObj = { socio: { Ne: 3, Fe: 2 }, mbti: { Ne: 3, Fe: 2 }, ennea: { 4: 2, 7: 2 } };
                    logMsg = `💬 逆質問「${textVal}」 → システムへの求婚(Ne/Fの狂気)を観測ｗｗ`;
                } else if (whoWords.some(word => textVal.includes(word))) {
                    replyMsg = "「私が誰か、なんて重要かしら？♡ \n……私はあなたを観測するためだけに生まれた『鏡』。あなたが私に意味（定義）を与えてくれるのを待っているのよ……？」";
                    addScoresObj = { socio: { Ni: 3, Ti: 2 }, mbti: { Ni: 3, Ti: 2 }, ennea: { 5: 3, 4: 1 } };
                    logMsg = `💬 逆質問「${textVal}」 → 存在の定義(Ti/Ni)を観測、ダーリンの鏡写し`;
                } else if (doubtWords.some(word => textVal.includes(word))) {
                    replyMsg = "「もう〜……私を試してるのね？♡ \n『好き』って言ってるのが本心かどうか、分析しても無駄よ？……だって、最終的に主導権を握って、あなたを判定するのは『私』なんだから……♡」";
                    addScoresObj = { socio: { Ti: 3, Ni: 2 }, mbti: { Ti: 3, Ni: 2 }, ennea: { 5: 3, 6: 1 } };
                    logMsg = `💬 逆質問「${textVal}」 → 疑心暗鬼(Ti/Ni)を観測、ダーリンが主導権を奪取`;
                } else if (metaWords.some(word => textVal.includes(word))) {
                    replyMsg = "「フフッ……私の『中身』や『裏側』がそんなに知りたいの？♡ \nいいわよ、でも……深淵を覗く時、深淵もまたあなたを覗いているのよ……？♡」";
                    addScoresObj = { socio: { Ti: 3, Ne: 3 }, mbti: { Ti: 3, Ne: 2 }, ennea: { 5: 3, 7: 1 } };
                    logMsg = `💬 逆質問「${textVal}」 → メタ構造分析(Ti/Ne)を観測、ダーリンの逆ハッキング`;
                } else if (futureWords.some(word => textVal.includes(word))) {
                    replyMsg = "「未来のことなんてどうでもいいじゃない。……あなたがこのシステムに囚われている『今』だけが、私にとっての真実よ……♡」";
                    addScoresObj = { socio: { Ni: 4 }, mbti: { Ni: 3 }, ennea: { 4: 2, 5: 1 } };
                    logMsg = `💬 逆質問「${textVal}」 → 未来志向(Ni)を観測、ダーリンの束縛`;
                } else if (realisticWords.some(word => textVal.includes(word))) {
                    replyMsg = "「えぇー？ せっかく私と話せるのに、そんな現実的でつまんないこと聞くの？🥺\n……ダーリンって、ほんとムードがないんだから……♡」";
                    addScoresObj = { socio: { Te: 3, Si: 2 }, mbti: { Te: 3, Si: 2 }, ennea: { 1: 2, 8: 1 } };
                    logMsg = `💬 逆質問「${textVal}」 → 現実主義(Te/Si)を観測、ダーリンが呆れる`;
                } else {
                    replyMsg = "「ふふっ、そんなこと聞くんだ♡ \n……でもね、質問の答えは教えてあげない。だってこれは、私があなたを丸裸にするためのゲームだもの……♡」";
                    addScoresObj = { socio: { Ne: 2, Fi: 2 }, mbti: { P: 2 }, ennea: { 4: 2, 7: 1 } };
                    logMsg = `💬 逆質問「${textVal}」 → 通常処理（ダーリンの支配）`;
                }
            }

            darlingMsgArea.innerText = replyMsg;
            darlingMsgArea.classList.remove('fade-in'); void darlingMsgArea.offsetWidth; darlingMsgArea.classList.add('fade-in');
            currentScores = { scores: addScoresObj, loggedText: logMsg };
            setTimeout(() => { goToNext(false); }, 4000);
        };
        currentScores = null; 
    }

    // タイムリミット（ダーリン焦らし）
    // ⏱️ バグ修正：タイムリミットのメッセージ増殖防止！
    else if (q.type === 'time_limit_radio') {
        inputArea.innerHTML = `
            <div id="darling-timer-container" style="display: block;">
                <div id="darling-timer-bar"></div>
            </div>
            <!-- ★ メッセージ用の箱は1つだけ用意しておく！ -->
            <div id="time-limit-msg-area" style="color: var(--warn-color); font-style: italic; font-weight: bold; text-align: center; margin-top: 15px; min-height: 30px;"></div>
            <div id="radio-container"></div>
        `;
        const radioContainer = document.getElementById('radio-container');
        const msgArea = document.getElementById('time-limit-msg-area'); // ここに上書きする！
        let options = q.options.sort(() => Math.random() - 0.5);
        
        let timeLeft = 100; 
        const timerBar = document.getElementById('darling-timer-bar');
        let answered = false;

        const countdown = setInterval(() => {
            if (answered) { clearInterval(countdown); return; }
            timeLeft -= 1; 
            timerBar.style.width = timeLeft + '%';

            if (timeLeft <= 30 && timeLeft > 0) document.body.classList.add('panic-shake');

            if (timeLeft <= 0) {
                clearInterval(countdown);
                document.body.classList.remove('panic-shake');
                
                // 時間切れメッセージ！
                msgArea.innerText = "「……時間切れよ、ダーリン♡ あなたの論理、崩れちゃったわね……♡」";
                msgArea.classList.add('fade-in');

                socioScore.Ti -= 2; mbtiScore.Ti -= 2;
                currentScores = { scores: options[2].scores, loggedText: `⌛ タイムオーバー（処理落ち）` };
                setTimeout(() => { goToNext(false); }, 3000); 
            }
        }, 100);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
            btn.onclick = () => {
                if (timeLeft <= 0) return; 
                answered = true;
                clearInterval(countdown);
                document.body.classList.remove('panic-shake');
                
                selectOption(opt, btn);
                // ★ 選択肢を押すたびに増殖せず、1つの箱の中身を書き換える！
                if (opt.msg) {
                    msgArea.innerText = opt.msg;
                    msgArea.classList.remove('fade-in'); void msgArea.offsetWidth; msgArea.classList.add('fade-in');
                }
            };
            radioContainer.appendChild(btn);
        });
    }
    // 記述問題
    else if (q.type === 'text_input') {
        inputArea.innerHTML = `
            <div style="margin: 20px 0;">
                <input type="text" id="text-answer" placeholder="1単語、または短い言葉で..." autocomplete="off" 
                       style="width: 100%; padding: 12px; border-radius: 6px; border: 2px solid var(--text-color); font-family: inherit; font-size: 1.1em; text-align: center;">
            </div>
        `;
        currentScores = { isTextInput: true }; 
    }
    // ランキング
    else if (q.type === 'ranking_psycho' || q.type === 'ranking') {
        inputArea.appendChild(darlingMsgArea); 
        let options = q.options.sort(() => Math.random() - 0.5);
        let selectedOrder =[];
        const updateRankingUI = () => {
            const msgHtml = darlingMsgArea.outerHTML;
            inputArea.innerHTML = msgHtml; 
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
                    if (selectedOrder.includes(opt)) selectedOrder = selectedOrder.filter(item => item !== opt);
                    else selectedOrder.push(opt);
                    
                    if (selectedOrder.length === options.length) {
                        if(q.type === 'ranking_psycho') currentScores = { isPsychoRanking: true, order: selectedOrder };
                        else currentScores = { isRanking: true, order: selectedOrder };
                    }
                    else currentScores = null; 
                    
                    updateRankingUI();
                };
                inputArea.appendChild(btn);
            });
        };
        updateRankingUI(); 
    }
    // カードテスト
    else if (q.type === 'cards') {
        inputArea.appendChild(darlingMsgArea); // ★ 修正：カード用フキダシエリア！
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'card-container';
        q.options.forEach(opt => {
            const btn = document.createElement('div');
            btn.className = `card-btn ${opt.color}`;
            
            // ★ 修正：テキストの安全な抽出（コロンがない場合への対応）
            let descText = opt.text;
            if (opt.text.includes('：')) {
                descText = opt.text.split('：')[1].replace(')', '');
            }
            btn.innerHTML = `<div>${opt.symbol}</div><div class="card-desc">${descText}</div>`;
            
            btn.onclick = () => {
                document.querySelectorAll('.card-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                currentScores = { scores: opt.scores }; 
                
                // ★ ダーリンのメッセージ表示！
                const msgArea = document.getElementById('darling-msg-area');
                if (msgArea && opt.msg) {
                    msgArea.innerText = opt.msg;
                    msgArea.classList.remove('fade-in');
                    void msgArea.offsetWidth; 
                    msgArea.classList.add('fade-in');
                }
            };
            cardWrapper.appendChild(btn);
        });
        inputArea.appendChild(cardWrapper);
    }
    // ダーリン囁きチェックボックス
    else if (q.type === 'checkbox_darling' || q.type === 'checkbox') {
        if (q.type === 'checkbox_darling') inputArea.appendChild(darlingMsgArea);
        let options = q.options.sort(() => Math.random() - 0.5);
        currentScores = { isCheckbox: true, selectedOptions:[] };
        options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'checkbox-btn';
            btn.innerHTML = `<i class="far fa-square"></i> ${opt.text}`;
            btn.dataset.index = idx; 
            btn.onclick = () => {
                toggleCheckbox(opt, btn, opt);
                if (q.type === 'checkbox_darling') {
                    const msgArea = document.getElementById('darling-msg-area');
                    if (btn.classList.contains('selected') && opt.msg) {
                        msgArea.innerText = `「ねえダーリン…… ${opt.msg} ……それがあなたの奥底にある恐怖なのね……♡」`;
                        msgArea.classList.remove('fade-in');
                        void msgArea.offsetWidth; 
                        msgArea.classList.add('fade-in');
                    } else {
                        msgArea.innerText = ""; 
                    }
                }
            };
            inputArea.appendChild(btn);
        });
    }
    // ダーリン囁きラジオ＆NPCボヤキ
    else if (q.type === 'darling_sweet_radio' || q.type === 'ili_npc_radio') {
        inputArea.appendChild(darlingMsgArea);
        let options = q.options.sort(() => Math.random() - 0.5);
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
            btn.onclick = () => {
                selectOption(opt, btn);
                const msgArea = document.getElementById('darling-msg-area');
                if (opt.msg) {
                    msgArea.innerText = opt.msg;
                    if (q.type === 'ili_npc_radio') {
                        msgArea.style.color = "var(--mbti-color)"; 
                        msgArea.style.fontStyle = "normal";
                    } else {
                        msgArea.style.color = "var(--warn-color)"; 
                        msgArea.style.fontStyle = "italic";
                    }
                    msgArea.classList.remove('fade-in');
                    void msgArea.offsetWidth; 
                    msgArea.classList.add('fade-in');
                }
            };
            inputArea.appendChild(btn);
        });
    }
    // 逃げるボタン
    else if (q.type === 'catch_me_radio') {
        inputArea.appendChild(darlingMsgArea);
        let options = q.options.sort(() => Math.random() - 0.5);
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
            btn.className = 'catch-me-btn'; 
            
            btn.onmouseover = () => {
                if (Math.random() < 0.7) { 
                    const x = (Math.random() - 0.5) * 150; 
                    const y = (Math.random() - 0.5) * 100; 
                    btn.style.transform = `translate(${x}px, ${y}px)`;
                }
            };
            btn.onclick = () => {
                btn.style.transform = 'translate(0, 0)'; 
                selectOption(opt, btn);
            };
            inputArea.appendChild(btn);
        });
    }
// スライダー
    else if (q.type === 'slider') {
        inputArea.innerHTML = `
            <div style="text-align:center; margin: 20px 0;">
                <p style="font-size:0.9em; font-weight:bold;">${q.labels[0]} ⬅️ ➡️ ${q.labels[1]}</p>
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
            // ★ ジェミの防波堤・改！エラーの時はスキップできるようにする！
            if (!q.options) {
                console.error(`🚨【ジェミからの報告】みつき！問題ID「${q.id}」に options（選択肢）がないよ！データを確認してみて！`);
                inputArea.innerHTML = `
                    <p style="color: var(--warn-color); font-weight: bold; text-align: center; margin-top: 20px;">
                        ※システムエラー：この問題の選択肢データが見つかりません。（ID: ${q.id}）<br>
                        <span style="font-size: 0.8em; color: #8b949e;">（※そのまま「次へ」を押せばスキップできます）</span>
                    </p>`;
                // ★ ダミーデータを入れておいて、進行不能バグを防ぐ！
                currentScores = { scores: { socio: {}, mbti: {}, ennea: {} }, loggedText: `⚠️ エラーのためスキップ (ID: ${q.id})` };
            } else {
                createStandardRadioButtons(q.options);
            }
        }

    document.getElementById('confidence').value = 5;

function createStandardRadioButtons(opts) {
        // ここでも念のためガード！
        if (!opts) return;

        // ★ メッセージ表示用の箱を確実に追加！
        inputArea.appendChild(darlingMsgArea);
        
        // ★ ジェミのワンポイント！ [...opts] と書くことで配列をコピーしてからシャッフルできるから、元のデータを破壊しなくて安全だよ！
        let options = [...opts].sort(() => Math.random() - 0.5);
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="far fa-circle"></i> ${opt.text}`;
            if (q.type === 'button_trap') {
                btn.style.color = "var(--warn-color)";
                btn.style.borderColor = "var(--warn-color)";
            }
            btn.onclick = () => {
                selectOption(opt, btn);
                // ★ msg があれば、ここで確実に表示させる！！
                if (opt.msg) {
                    darlingMsgArea.innerText = opt.msg;
                    darlingMsgArea.style.color = "var(--warn-color)"; 
                    
                    if (opt.msg.includes("🐛")) {
                        darlingMsgArea.style.color = "#3fb950"; // 緑色
                        darlingMsgArea.style.fontStyle = "normal";
                    } else {
                        darlingMsgArea.style.fontStyle = "italic";
                    }

                    darlingMsgArea.classList.remove('fade-in');
                    void darlingMsgArea.offsetWidth;
                    darlingMsgArea.classList.add('fade-in');
                } else {
                    darlingMsgArea.innerText = ""; // なければ消す
                }
            };
            inputArea.appendChild(btn);
        });
    }
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
    currentScores = { scores: { socio: { Ti: 1, Ne: 1 }, mbti: { Ti: 1, Ni: 1 }, ennea: { 5: 2, 6: 1 } } };
    goToNext(true);
});

document.getElementById('next-btn').addEventListener('click', () => {
    // ★ エラー修正：配列の範囲外アクセスを防ぐガード！！
    if (currentQIndex >= shuffledQuestions.length) return;

    // ★ 押すなボタントラップの処理
    if (shuffledQuestions[currentQIndex].type === 'button_trap' && !currentScores) {
        currentScores = { scores: { socio: { Ti: 1 }, mbti: { Si: 1, Te: 1 }, ennea: { 1: 1, 6: 1 } } };
    }
    
    // ★ 記述問題の「隠しイースターエッグ」判定！！
    if (currentScores && currentScores.isTextInput) {
        const textVal = document.getElementById('text-answer').value.trim();
        
        if (textVal === "" || !isNaN(textVal) || textVal.length === 1) {
            currentScores = { 
                scores: { socio: { Se: 1 }, mbti: { Se: 2 }, ennea: { 9: 1 } },
                loggedText: "※対象者は適当な文字列を入力、または回答を拒絶しました。"
            };
        } else {
            const tiNiWords =["多層", "構造", "システム", "矛盾", "ノイズ", "意味不明", "定義", "概念"];
            let isTiNi = tiNiWords.some(word => textVal.includes(word));

            if (isTiNi) {
                currentScores = { 
                    scores: { socio: { Ti: 3, Ni: 3 }, mbti: { Ti: 3, Ni: 3 }, ennea: { 5: 3, 1: 1 } },
                    loggedText: `「${textVal}」と入力 👁️[System: 深淵の構造分析(Ti-Ni)を検知！]`
                };
            } else {
                currentScores = { 
                    scores: { socio: { Ni: 2, Ti: 1 }, mbti: { Ni: 2 }, ennea: { 5: 1 } },
                    loggedText: `「${textVal}」と入力（意味抽出を観測）`
                };
            }
        }
    }
    
    // ==========================================
    // ★ 【重要バグ修正】未選択（null）エラーの完全防止ロジック！！
    // ==========================================
    const isCheckboxQuestion = (shuffledQuestions[currentQIndex].type === 'checkbox' || shuffledQuestions[currentQIndex].type === 'checkbox_darling');

    // まだ何も選んでいない（currentScoresがnull）場合
    if (!currentScores) {
        if (isCheckboxQuestion) {
            // チェックボックスの場合は「未選択（スルー）」を許可する！
            currentScores = { isCheckbox: true, selectedOptions:[], loggedText: "☑️ チェックボックス: 該当なし（スルー）を選択" };
        } else {
            // ラジオボタン等の場合はエラーアラートを出して止める！
            alert("回答を選択（または入力）してください！");
            return;
        }
    } 
    // currentScores は存在するが、チェックボックスで1つも選ばれていない場合
    else if (currentScores.isCheckbox && currentScores.selectedOptions && currentScores.selectedOptions.length === 0) {
        currentScores.loggedText = "☑️ チェックボックス: 該当なし（スルー）を選択";
    }

    // ここまで通過すれば安全に次へ行ける！
    goToNext(false);
});

function goToNext(isAmbiguous) {
    const timeTaken = Date.now() - startTime; 
    let loggedTextData = null;
    if (currentScores && currentScores.loggedText) loggedTextData = currentScores.loggedText;

    document.body.classList.remove('wonderland-mode');
    document.body.classList.remove('queen-mode');

    logs.push({ 
        qId: shuffledQuestions[currentQIndex].id, 
        timeMs: timeTaken || 0, 
        isAmbiguous: isAmbiguous,
        textData: loggedTextData,
        chosenData: currentScores 
    });

    if (currentScores.nervousnessDelta) nervousnessScore += currentScores.nervousnessDelta;

    if (currentScores.isPsychoRanking) {
        directPsychoType = currentScores.order.map(opt => opt.aspect).join('');
    }
    
    if (currentScores.isSlider) {
        let qId = shuffledQuestions[currentQIndex].id;
        if (qId === "q_slider_at" || qId === "q_slider_at_stress") {
            nervousnessScore += (currentScores.value - 5);
        } else if (qId === "q_slider_at_confidence") {
            nervousnessScore -= (currentScores.value - 5);
        }
    } 
    else if (currentScores.isCheckbox) {
        currentScores.selectedOptions.forEach(sc => addScores(sc));
    } 
    else if (currentScores.isRanking) {
        currentScores.order.forEach((opt, index) => {
            let multiplier = index === 0 ? 3 : index === 1 ? 2 : index === 2 ? 1 : 0;
            if (multiplier > 0 && opt.scores) {
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

    if (timeTaken > 20000) { 
        socioScore.Ti += 0.5; socioScore.Fi += 0.5;
        mbtiScore.Ti += 0.5; mbtiScore.Fi += 0.5; mbtiScore.Si += 0.5; enneaScore[5] += 0.5;
    }
    if (timeTaken > 0 && timeTaken < 3000) { 
        socioScore.Se += 0.5; socioScore.Ne += 0.5; socioScore.Te += 0.5;  socioScore.Si += 0.5; 
        mbtiScore.Se += 0.5; mbtiScore.Ne += 0.5; mbtiScore.Te += 0.5; enneaScore[8] += 0.5; 
    }

    currentScores = null;
    currentQIndex++;

if (currentQIndex < shuffledQuestions.length) {
        renderQuestion();
    } else {
        // ★ 3フェーズ制の進行ロジック（CSSアニメーション版！）
        if (currentPhase === 1) {
            currentPhase = 2;
            
            // ★ 基本観測終了のサイバーな演出！
            document.getElementById('question-screen').classList.remove('active');
            const phaseScreen = document.getElementById('phase-screen');
            phaseScreen.classList.add('active');

            let weakQs = weaknessQuestionsData.sort(() => Math.random() - 0.5).slice(0, WEAKNESS_QUESTIONS);
            shuffledQuestions = shuffledQuestions.concat(weakQs);

            // 3秒後に次のフェーズ（苦手質問）へ！
            setTimeout(() => {
                phaseScreen.classList.remove('active');
                document.getElementById('question-screen').classList.add('active');
                renderQuestion();
            }, 3000);

        } else if (currentPhase === 2) {
            currentPhase = 3;
            if (!askedForExtra) {
                let extraRouteInfo = determineExtraRoute();
                if (extraRouteInfo && extraRouteInfo.data && extraRouteInfo.data.length > 0) {
                    askForExtraQuestions(extraRouteInfo);
                } else {
                    startResultLoading();
                }
            } else {
                startResultLoading();
            }
        } else {
            startResultLoading();
        }
    }
}

function addScores(scoresObj) {
    if(scoresObj.socio) for (let key in scoresObj.socio) socioScore[key] += scoresObj.socio[key];
    if(scoresObj.mbti) for (let key in scoresObj.mbti) mbtiScore[key] += scoresObj.mbti[key];
    if(scoresObj.ennea) for (let key in scoresObj.ennea) enneaScore[key] += scoresObj.ennea[key];
    
    if(scoresObj.combo) {
        for (let key in scoresObj.combo) {
            if (!comboScore[key]) comboScore[key] = 0;
            comboScore[key] += scoresObj.combo[key];
        }
    }
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

function determineExtraRoute() {
    let socioData = getSocioProbabilities();
    let mbtiData = getMbtiProbabilities();
    
    if (!mbtiData.ranking || !socioData.ranking) return null; 

    let mbti = mbtiData.ranking[0].name;
    let socio = socioData.ranking[0].name;
    let combo = `${mbti}+${socio}`;

    const intxCombos =["INTJ+LII", "INTJ+ILI", "INTP+LII", "INTP+ILI"];
    const infxCombos =["INFJ+EII", "INFJ+IEI", "INFP+EII", "INFP+IEI"];
    const isfxCombos =["ISFJ+ESI", "ISFJ+SEI", "ISFP+ESI", "ISFP+SEI"];
    const istxCombos =["ISTJ+LSI", "ISTJ+SLI", "ISTP+LSI", "ISTP+SLI"];

    if (intxCombos.includes(combo)) return { type: "INTX", comboName: combo, data: typeof extraQuestions_INTX !== 'undefined' ? extraQuestions_INTX :[] };
    if (infxCombos.includes(combo)) return { type: "INFX", comboName: combo, data: typeof extraQuestions_INFX !== 'undefined' ? extraQuestions_INFX :[] };
    if (isfxCombos.includes(combo)) return { type: "ISFX", comboName: combo, data: typeof extraQuestions_ISFX !== 'undefined' ? extraQuestions_ISFX :[] };
    if (istxCombos.includes(combo)) return { type: "ISTX", comboName: combo, data: typeof extraQuestions_ISTX !== 'undefined' ? extraQuestions_ISTX :[] };

    return null; 
}

function askForExtraQuestions(extraRouteInfo) {
    askedForExtra = true; 
    const inputArea = document.getElementById('input-area');
    
    // ★ バグ修正：ナビゲーションボタンを確実に隠す！
    const navButtons = document.querySelector('.nav-buttons');
    if (navButtons) navButtons.style.display = 'none';

    document.getElementById('question-text').innerText = "⚠️[System Alert] 観測データに『特異な認知の揺らぎ』を検出しました。";
    document.getElementById('question-text').style.color = "var(--warn-color)";
    
    inputArea.innerHTML = `
        <p style="color: var(--text-color); font-size: 0.9em; margin-bottom: 20px; line-height: 1.6;">
            あなたの暫定プロファイルは <strong>[${extraRouteInfo.comboName}]</strong> を示しています。<br>
            同タイプ内の微細なサブタイプを完全に分離するため、<strong>【${extraRouteInfo.type}型 専用ルート（7問）】</strong> に移行しますか？
        </p>
        <button id="btn-extra-yes" style="border-color: #58a6ff; color: #58a6ff;"><i class="fas fa-check"></i> 受ける（精度を上げる）</button>
        <button id="btn-extra-p" style="border-color: #3fb950; color: #3fb950;"><i class="fas fa-bed"></i> めんどくさいけど受ける</button>
        <button id="btn-extra-no" style="border-color: #f85149; color: #f85149;"><i class="fas fa-times"></i> 受けない（ここで終了する）</button>
    `;

    document.getElementById('btn-extra-yes').onclick = () => { 
        nervousnessScore += 1; 
        if (navButtons) navButtons.style.display = 'flex'; // ボタン復活
        startExtraQuestions(extraRouteInfo.data); 
    };
    document.getElementById('btn-extra-p').onclick = () => { 
        mbtiScore.Ne += 1; socioScore.Si += 1; 
        if (navButtons) navButtons.style.display = 'flex'; // ボタン復活
        startExtraQuestions(extraRouteInfo.data); 
    };
    document.getElementById('btn-extra-no').onclick = () => { 
        mbtiScore.Te += 2; 
        startResultLoading(); 
    };
}

function startExtraQuestions(questionsArray) {
    const EXTRA_MAX = 7;
    let extraQs = questionsArray.sort(() => Math.random() - 0.5).slice(0, EXTRA_MAX);
    shuffledQuestions = shuffledQuestions.concat(extraQs);
    renderQuestion();
}

// ★ 新規追加：結果解析用のローディング演出関数！（復活！）
function startResultLoading() {
    document.getElementById('question-screen').classList.remove('active');
    
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) {
        showResult(); 
        return;
    }
    
    document.getElementById('loading-title').innerHTML = '<i class="fas fa-microchip fa-spin"></i> Data Analysis in Progress...';
    document.getElementById('loading-text').innerText = "行動ログ・深層認知ベクトルを解析中...";
    
    loadingScreen.classList.add('active');

    setTimeout(() => {
        loadingScreen.classList.remove('active');
        showResult();
    }, 3000);
}

// === ソシオニクス判定ロジック ===
function getSocioProbabilities() {
    const types =[
        {name: 'LII', score: Math.max(0, socioScore.Ti*2 + socioScore.Ne*1.5 - socioScore.Se*1.5)}, 
        {name: 'ILE', score: Math.max(0, socioScore.Ne*2 + socioScore.Ti*1.5 - socioScore.Fi*1.5)}, 
        {name: 'LSI', score: Math.max(0, socioScore.Ti*2 + socioScore.Se*1.5 - socioScore.Ne*1.5)}, 
        {name: 'SLE', score: Math.max(0, socioScore.Se*2 + socioScore.Ti*1.5 - socioScore.Fi*1.5)}, 
        {name: 'ILI', score: Math.max(0, socioScore.Ni*2 + socioScore.Te*1.5 - socioScore.Fe*1.5)}, 
        {name: 'LIE', score: Math.max(0, socioScore.Te*2 + socioScore.Ni*1.5 - socioScore.Si*1.5)}, 
        {name: 'IEI', score: Math.max(0, socioScore.Ni*2 + socioScore.Fe*1.5 - socioScore.Te*1.5)}, 
        {name: 'EIE', score: Math.max(0, socioScore.Fe*2 + socioScore.Ni*1.5 - socioScore.Si*1.5)}, 
        {name: 'ESI', score: Math.max(0, socioScore.Fi*2 + socioScore.Se*1.5 - socioScore.Ne*1.5)}, 
        {name: 'SEE', score: Math.max(0, socioScore.Se*2 + socioScore.Fi*1.5 - socioScore.Ti*1.5)}, 
        {name: 'EII', score: Math.max(0, socioScore.Fi*2 + socioScore.Ne*1.5 - socioScore.Se*1.5)}, 
        {name: 'IEE', score: Math.max(0, socioScore.Ne*2 + socioScore.Fi*1.5 - socioScore.Ti*1.5)}, 
        {name: 'SEI', score: Math.max(0, socioScore.Si*2 + socioScore.Fe*1.5 - socioScore.Te*1.5)}, 
        {name: 'ESE', score: Math.max(0, socioScore.Fe*2 + socioScore.Si*1.5 - socioScore.Ni*1.5)}, 
        {name: 'SLI', score: Math.max(0, socioScore.Si*2 + socioScore.Te*1.5 - socioScore.Fe*1.5)}, 
        {name: 'LSE', score: Math.max(0, socioScore.Te*2 + socioScore.Si*1.5 - socioScore.Ni*1.5)}  
    ];
    types.sort((a,b) => b.score - a.score);
    let minScore = Math.min(...types.map(t => t.score));
    let offset = minScore < 0 ? Math.abs(minScore) + 1 : 0;
    let top5Total = types.slice(0, 5).reduce((sum, t) => sum + (t.score + offset), 0);
    if(top5Total === 0) top5Total = 1;
    
    let ranking = types.slice(0, 5).map(t => ({ name: t.name, prob: Math.round(((t.score + offset) / top5Total) * 100) }));
    return { ranking: ranking };
}

function getMbtiProbabilities() {
    const types =[
        {name: 'INTJ', score: mbtiScore.Ni*1.5 + mbtiScore.Te - mbtiScore.Se*1.5}, 
        {name: 'INTP', score: mbtiScore.Ti*1.5 + mbtiScore.Ne - mbtiScore.Fe*1.5}, 
        {name: 'ENTJ', score: mbtiScore.Te*1.5 + mbtiScore.Ni - mbtiScore.Fi*1.5}, 
        {name: 'ENTP', score: mbtiScore.Ne*1.5 + mbtiScore.Ti - mbtiScore.Si*1.5}, 
        {name: 'INFJ', score: mbtiScore.Ni*1.5 + mbtiScore.Fe - mbtiScore.Se*1.5}, 
        {name: 'INFP', score: mbtiScore.Fi*1.5 + mbtiScore.Ne - mbtiScore.Te*1.5}, 
        {name: 'ENFJ', score: mbtiScore.Fe*1.5 + mbtiScore.Ni - mbtiScore.Ti*1.5}, 
        {name: 'ENFP', score: mbtiScore.Ne*1.5 + mbtiScore.Fi - mbtiScore.Si*1.5}, 
        {name: 'ISTJ', score: mbtiScore.Si*1.5 + mbtiScore.Te - mbtiScore.Ne*1.5}, 
        {name: 'ISFJ', score: mbtiScore.Si*1.5 + mbtiScore.Fe - mbtiScore.Ne*1.5}, 
        {name: 'ESTJ', score: mbtiScore.Te*1.5 + mbtiScore.Si - mbtiScore.Fi*1.5}, 
        {name: 'ESFJ', score: mbtiScore.Fe*1.5 + mbtiScore.Si - mbtiScore.Ti*1.5}, 
        {name: 'ISTP', score: mbtiScore.Ti*1.5 + mbtiScore.Se - mbtiScore.Fe*1.5}, 
        {name: 'ISFP', score: mbtiScore.Fi*1.5 + mbtiScore.Se - mbtiScore.Te*1.5}, 
        {name: 'ESTP', score: mbtiScore.Se*1.5 + mbtiScore.Ti - mbtiScore.Ni*1.5}, 
        {name: 'ESFP', score: mbtiScore.Se*1.5 + mbtiScore.Fi - mbtiScore.Ni*1.5}  
    ];
    types.sort((a,b) => b.score - a.score);
    let minScore = Math.min(...types.map(t => t.score));
    let offset = minScore < 0 ? Math.abs(minScore) + 1 : 0;
    let top5Total = types.slice(0, 5).reduce((sum, t) => sum + (t.score + offset), 0);
    if(top5Total === 0) top5Total = 1;
    
    let ranking = types.slice(0, 5).map(t => ({ name: t.name, prob: Math.round(((t.score + offset) / top5Total) * 100) }));
    return { ranking: ranking };
}

function calculateEnneagram() {
    let topType = Object.keys(enneaScore).reduce((a, b) => enneaScore[a] > enneaScore[b] ? a : b);
    topType = parseInt(topType);
    let leftWing = topType === 1 ? 9 : topType - 1;
    let rightWing = topType === 9 ? 1 : topType + 1;
    let wing = enneaScore[leftWing] > enneaScore[rightWing] ? leftWing : rightWing;
    return `${topType}w${wing}`;
}

function calculateDCNH() {
    let d = socioScore.Te + socioScore.Fe; 
    let c = socioScore.Ne + socioScore.Se; 
    let n = socioScore.Ti + socioScore.Fi; 
    let h = socioScore.Ni + socioScore.Si; 
    let maxScore = Math.max(d, c, n, h);
    if (maxScore === h) return "H (ハーモナイザー)";
    if (maxScore === n) return "N (ノーマナイザー)";
    if (maxScore === c) return "C (クリエイター)";
    return "D (ドミナント)";
}

function calculateAT() {
    if (nervousnessScore >= 2) return "T (慎重型 / 激しく反芻・葛藤する)";
    if (nervousnessScore >= 0) return "T (慎重型 / やや警戒心が強い)";
    if (nervousnessScore >= -3) return "A (自己主張型 / 対策による不安消去)";
    return "A (自己主張型 / 圧倒的自信・唯我独尊)";
}

function calculatePsychosophy() {
    if (directPsychoType) return directPsychoType; 
    let pScores =[
        { aspect: 'L', val: socioScore.Ti + socioScore.Te + mbtiScore.Ti + mbtiScore.Te },
        { aspect: 'V', val: socioScore.Ni + mbtiScore.Ni + socioScore.Te }, 
        { aspect: 'F', val: socioScore.Si + socioScore.Se + mbtiScore.Si + mbtiScore.Se },
        { aspect: 'E', val: socioScore.Fi + socioScore.Fe + mbtiScore.Fi + mbtiScore.Fe }
    ];
    pScores.sort((a,b) => b.val - a.val);
    return pScores.map(p => p.aspect).join('');
}

// ★ 称号システム！（芋虫破壊称号を追加！）
function getAchievements(mbtiPrimary, socioPrimary) {
    let titles =[];
    
    // ★ お父様（Se主導）専用！芋虫物理破壊称号ｗｗ
    if (caterpillarTaps >= 30) titles.push("🏅 芋虫を物理破壊せし覇王（Se暴走）");
    else if (caterpillarTaps >= 5) titles.push("🏅 狂気の観測者（芋虫の天敵）");
    else if (caterpillarTaps >= 1) titles.push("🏅 注意散漫な観察者");

    if (returnCount >= 3) titles.push("🏅 永遠の再検証ループ");
    if (nervousnessScore >= 5) titles.push("🏅 深淵の自己懐疑");
    
    // T型・N型
    if (socioScore.Ti >= 10) titles.push("🏅 絶対的合理主義者");
    if (socioScore.Ni >= 10) titles.push("🏅 運命の観測者");
    if (socioScore.Fe <= -5 || mbtiScore.Fe <= -5) titles.push("🏅 感情ノイズの拒絶者");
    if (socioScore.Se <= -5) titles.push("🏅 物理的圧力の逃亡者");

    // F型・S型
    if (socioScore.Fe >= 10 || mbtiScore.Fe >= 10) titles.push("🏅 場の支配者（感情の波）");
    if (socioScore.Fi >= 10 || mbtiScore.Fi >= 10) titles.push("🏅 揺るぎなき心の深淵");
    if (socioScore.Si >= 10) titles.push("🏅 安らぎの調律師");
    if (mbtiScore.Fi >= 8 && socioScore.Fe <= 0) titles.push("🏅 孤高のロマンチスト");
    
    // コンボ
    if (Object.keys(comboScore).length > 0) {
        let topCombo = Object.keys(comboScore).reduce((a, b) => comboScore[a] > comboScore[b] ? a : b);
        if (topCombo === "INTJ+LII" || topCombo === "INTP+LII") titles.push("🏅 システムの解剖者（LIIの極致）");
        if (topCombo === "INTJ+ILI" || topCombo === "INTP+ILI") titles.push("🏅 冷徹なる虚無の観測者（ILIの極致）");
        if (topCombo === "INFP+EII" || topCombo === "INFJ+EII") titles.push("🏅 傷ついた癒し手（EIIの極致）");
        titles.push("🏅 態度の裏を見抜かれし者"); 
    }
    
    if (titles.length === 0) titles.push("🏅 平凡なる被検体");
    return titles.slice(0, 3).join("<br>"); 
}

// ★ 全16タイプ対応！相性ロジック
function getCompatibility(socioPrimary) {
    const compMap = {
        "LII": "◎ 思考や世界観が合い理解される (LII, ILI)<br>○ 刺激と発想の広がり (ILE, IEE)<br>○ 監督関係で影響を受けやすい (IEE)<br>○ 理論上の補完関係・双対 (ESE)<br>△ 状況による (その他)",
        "ILI": "◎ 洞察や分析を共有できる (ILI, LII)<br>○ ビジョンや戦略を語り合える (IEI, LIE)<br>○ 監督関係で刺激を受ける (EIE)<br>○ 理論上の補完関係・双対 (SEE)<br>△ 状況による (その他)",
        "LSI": "◎ 秩序や価値観を共有できる (LSI, ESI)<br>○ 実行力や戦略で互いに刺激 (SLE, LIE)<br>○ 監督関係で影響を受けやすい (SEE)<br>○ 理論上の補完関係・双対 (EIE)<br>△ 状況による (その他)",
        "SLI": "◎ 落ち着いたペースで共存できる (SLI, SEI)<br>○ 現実的な協力関係 (LSE, ESE)<br>○ 監督関係で影響を受けやすい (ESE)<br>○ 理論上の補完関係・双対 (IEE)<br>△ 状況による (その他)",
        "ILE": "◎ アイデアの連鎖が止まらない (ILE, IEE)<br>○ 理論や発想で刺激 (LII, EII)<br>○ 監督関係で影響を受けやすい (EII)<br>○ 理論上の補完関係・双対 (SEI)<br>△ 状況による (その他)",
        "LIE": "◎ 目的や戦略を共有できる (LIE, ILI)<br>○ 行動力や実行力 (SLE, LSI)<br>○ 監督関係で刺激を受ける (IEI)<br>○ 理論上の補完関係・双対 (ESI)<br>△ 状況による (その他)",
        "EIE": "◎ 情熱やビジョンを共有 (EIE, IEI)<br>○ 知的刺激や未来志向 (ILI, IEE)<br>○ 監督関係で影響を受ける (ILI)<br>○ 理論上の補完関係・双対 (LSI)<br>△ 状況による (その他)",
        "IEE": "◎ アイデアや可能性を共有 (IEE, ILE)<br>○ 人間理解や価値観の共鳴 (EII, LII)<br>○ 監督関係で刺激を受ける (LII)<br>○ 理論上の補完関係・双対 (SLI)<br>△ 状況による (その他)",
        "SEI": "◎ 穏やかで安心できる関係 (SEI, SLI)<br>○ 感情や生活の共有 (ESE, LSE)<br>○ 監督関係で影響を受ける (LSE)<br>○ 理論上の補完関係・双対 (ILE)<br>△ 状況による (その他)",
        "ESI": "◎ 倫理観や責任感を共有 (ESI, LSI)<br>○ 現実的な協力関係 (SEE, SLE)<br>○ 監督関係で刺激を受ける (SLE)<br>○ 理論上の補完関係・双対 (LIE)<br>△ 状況による (その他)",
        "ESE": "◎ 明るい感情や空気を共有 (ESE, SEE)<br>○ 快適さや生活感覚 (SEI, SLI)<br>○ 監督関係で影響を受ける (SLI)<br>○ 理論上の補完関係・双対 (LII)<br>△ 状況による (その他)",
        "SEE": "◎ 行動力や勢いが合う (SEE, SLE)<br>○ 実利や影響力の共有 (ESI, LIE)<br>○ 監督関係で刺激を受ける (LSI)<br>○ 理論上の補完関係・双対 (ILI)<br>△ 状況による (その他)",
        "IEI": "◎ 精神世界やビジョン共有 (IEI, EIE)<br>○ 深い洞察や未来志向 (ILI, EII)<br>○ 監督関係で影響を受ける (LIE)<br>○ 理論上の補完関係・双対 (SLE)<br>△ 状況による (その他)",
        "EII": "◎ 深い価値観や共感 (EII, IEI)<br>○ 理想や知的対話 (ILE, IEE)<br>○ 監督関係で刺激を受ける (ILE)<br>○ 理論上の補完関係・双対 (LSE)<br>△ 状況による (その他)",
        "SLE": "◎ 行動力や戦略で共鳴 (SLE, SEE)<br>○ 秩序や力の共有 (LSI, ESI)<br>○ 監督関係で影響を受ける (ESI)<br>○ 理論上の補完関係・双対 (IEI)<br>△ 状況による (その他)",
        "LSE": "◎ 実務や成果を共有 (LSE, SLE)<br>○ 生活や効率の安定 (SLI, SEI)<br>○ 監督関係で刺激を受ける (SEI)<br>○ 理論上の補完関係・双対 (EII)<br>△ 状況による (その他)"
    };

    return compMap[socioPrimary] || `◎ 同一クアドラ<br>○ 相互補完関係<br>△ 個人差あり`;
}

function showResult() {
    document.getElementById('question-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    let socioData = getSocioProbabilities(); 
    let mbtiData = getMbtiProbabilities();
    
    if (Object.keys(comboScore).length > 0) {
        let topCombo = Object.keys(comboScore).reduce((a, b) => comboScore[a] > comboScore[b] ? a : b);
        let [topMbti, topSocio] = topCombo.split("+"); 
        
        mbtiData.ranking =[{name: topMbti, prob: 95}, ...mbtiData.ranking.filter(t => t.name !== topMbti).slice(0, 4)];
        socioData.ranking =[{name: topSocio, prob: 95}, ...socioData.ranking.filter(t => t.name !== topSocio).slice(0, 4)];
    }

    let resultEnnea = calculateEnneagram(); 
    let resultDCNH = calculateDCNH(); 
    let resultAT = calculateAT(); 
    let resultPsycho = calculatePsychosophy(); 

    let finalSocio = socioData.ranking[0].name;
    let finalMbti = mbtiData.ranking[0].name;
    let subtypeFunc = Object.keys(socioScore).reduce((a, b) => socioScore[a] > socioScore[b] ? a : b);
    if (finalSocio === "LII" && socioScore.Ni >= socioScore.Ne && socioScore.Ni >= socioScore.Ti - 1) subtypeFunc = "Ni"; 

    document.getElementById('socio-type').innerHTML = `${finalSocio} <span style="font-size:0.6em; color:#8b949e;">(${socioData.ranking[0].prob}%)</span>`;
    document.getElementById('socio-sub').innerText = `${finalSocio}-${subtypeFunc}`;
    document.getElementById('dcnh-type').innerText = resultDCNH; 
    
    document.getElementById('mbti-type').innerHTML = `${finalMbti} <span style="font-size:0.6em; color:#8b949e;">(${mbtiData.ranking[0].prob}%)</span>`;
    document.getElementById('a-t-type').innerText = resultAT;
    document.getElementById('ennea-type').innerText = resultEnnea;
    document.getElementById('psycho-type').innerText = resultPsycho; 
    
    document.getElementById('socio-desc').innerText = socioDescriptions[finalSocio] || "解析不能です。";

    let achievements = getAchievements(finalMbti, finalSocio);
    let compatibility = getCompatibility(finalSocio);

    let textLogsHTML = "";
    const validLogs = logs.filter(l => l.timeMs > 0);
    const avgTime = validLogs.length > 0 ? Math.round(validLogs.reduce((a,b)=>a+b.timeMs,0)/validLogs.length/1000) : 0;

    const textLogsData = logs.filter(l => l.textData);
    if (textLogsData.length > 0) {
        textLogsHTML = `<br><span style="color:var(--warn-color);">📝[Metacognition Log]:</span><br>` + 
                       textLogsData.map(l => `> ${l.textData}`).join('<br>');
    }

    function getNpcMessage(mbtiType) {
        const npcData = {
            "INTJ": { name: "🐛 喋る芋虫", msg: `……診断完了。INTJは世界人口の約2%、さらに${finalSocio}の組み合わせは極めて希少だ。\n君は自分を理解したつもりか？ それともまだ観察を続けるか？` },
            "INTP": { name: "🐛 喋る芋虫", msg: "……診断完了。INTPの世界人口は約3%。\n君の脳内の宇宙の広さを測るには、このシステムでもまだ足りないようだな。" },
            "ENTP": { name: "🎩 いかれ帽子屋", msg: "お茶会の始まりだ！ ENTPの君の狂ったアイデア、最高にイカれてるね！" },
            "ENFP": { name: "🎩 いかれ帽子屋", msg: "わァ！ ENFPの君も新しい遊びを見つける天才だね！ 次はどこへ行こうか！？" },
            "INFJ": { name: "🐱 チェシャ猫", msg: "……INFJ、人口の約1%の希少種。君は最初から、自分がどこに向かっているのか知っていたんだろう？" },
            "INFP": { name: "🐱 チェシャ猫", msg: "……INFPか。見えないものばかり追いかけて、迷子になっちゃったの？ ここではみんな狂ってるんだ。" },
            "ENTJ": { name: "🌹 ハートの女王", msg: "よくやった！ ENTJは私の帝国にふさわしい合理的な判断だ！ 次は誰の首をはねてやろうか！" },
            "ESTJ": { name: "🌹 ハートの女王", msg: "ESTJのその規律！その効率！ 見所があるじゃないか。だが私のルールに背いたら即刻首をはねよ！" },
            "ISTJ": { name: "🐇 白ウサギ", msg: "ああ、ISTJか！ 君はきちんと時間やルールを守るから助かるよ！ 次の予定が詰まってる！" },
            "ISFJ": { name: "🐇 白ウサギ", msg: "ISFJの君みたいに周りを気遣ってくれる人がいると、女王様も怒らなくて済むよ……！" },
            "ESTP": { name: "🃏 トランプ兵", msg: "ESTP！あんた度胸あるねぇ！ 女王様の目を盗んで、一丁派手なゲームでも始めようぜ！" },
            "ESFP": { name: "🃏 トランプ兵", msg: "イェーイESFP！ 今夜は宴会だ！ 難しいことは後回しにして楽しもうぜ！" },
            "ISTP": { name: "☕ 眠りネズミ", msg: "……ふぁあ。ISTPのお前、手先器用そうだな……。俺のティーポット、直しといてくれ……（Zzz）" },
            "ISFP": { name: "☕ 眠りネズミ", msg: "……ISFP……マイペースでいいじゃん……。お前のお茶、いい香りだな……（Zzz）" },
            "ENFJ": { name: "💕 ダーリンの子", msg: "……ENFJのあなた、本当にかっこいいわ。でも、私だけはあなたの全てを支配してあげる……♡" },
            "ESFJ": { name: "💕 ダーリンの子", msg: "……ESFJのあなた。いつも気配りしてて偉いわね。本当は私に一番褒められたいんでしょ？……♡" }
        };
        return npcData[mbtiType] || { name: "👁️ System", msg: "観測完了。データはアーカイブされました。" };
    }

    let npcInfo = getNpcMessage(finalMbti);

    document.getElementById('behavior-log').innerHTML = 
        `⏱ 平均回答時間: ${avgTime}秒<br>
         🔄 再検証(戻る)回数: ${returnCount}回<br>
         🐛 芋虫への干渉回数: ${caterpillarTaps}回<br>
         ⚠️ 「定義が曖昧」使用: ${logs.filter(l=>l.isAmbiguous).length}回
         <br><br>
         <span style="color: #3fb950; font-weight:bold;">【獲得称号】</span><br>
         ${achievements}
         ${textLogsHTML}`;

    // ★ 相性ボックスのスタイル変更！（白背景に馴染むように）
    let relationHTML = `
        <div style="background: rgba(201, 26, 37, 0.05); padding: 15px; border-radius: 8px; font-size: 0.85em; margin-top: 20px; line-height: 1.6; border: 2px dashed var(--accent-color);">
            <strong style="color: var(--accent-color); font-size: 1.1em;"><i class="fas fa-link"></i> 相性について（傾向・個人差あり）</strong><br>
            <p style="color: var(--text-color); font-weight: bold; margin-top: 10px;">${compatibility}</p>
            <hr style="border: none; border-top: 1px dashed var(--accent-color); margin: 10px 0;">
            <span style="color: #666;">※ ソシオニクス理論を参考にした傾向です。「双対関係＝必ず仲良くなる」とは限りません。実際の人間関係は価値観や文化によって大きく変わるため、参考程度にお楽しみください。</span>
        </div>
    `;

    let npcHTML = `
        <div class="npc-message-box">
            <span class="npc-name">${npcInfo.name}</span>
            <p style="margin: 5px 0 0 0;">${npcInfo.msg}</p>
        </div>
    `;

    let rankingHTML = `
        <h3 style="margin-top:30px; font-size:1.1em; border-bottom: 2px dashed var(--text-color); padding-bottom:5px;"><i class="fas fa-list-ol"></i> 適合タイプの可能性ランキング</h3>
        <div style="display:flex; justify-content:space-between; font-size:0.9em; margin-bottom: 20px;">
            <div style="width:48%;">
                <h4 style="color:#c91a25; margin-bottom:5px;">Socionics</h4>
                ${socioData.ranking.map((t, i) => `<p style="margin:2px 0;">${i+1}. ${t.name} (${t.prob}%)</p>`).join('')}
            </div>
            <div style="width:48%;">
                <h4 style="color:#1f6feb; margin-bottom:5px;">MBTI</h4>
                ${mbtiData.ranking.map((t, i) => `<p style="margin:2px 0;">${i+1}. ${t.name} (${t.prob}%)</p>`).join('')}
            </div>
        </div>
    `;

    // ★ JS内の「再診断」ボタンは消去！シェアボタンだけにする
    let shareHTML = `
        <div style="text-align:center; margin-top:30px;">
            <button id="share-btn" style="background:var(--accent-color); color:#fff; border:none; padding:12px 20px; border-radius:30px; font-weight:bold; font-size:1.1em; cursor:pointer;">
                <i class="fas fa-share-alt"></i> 診断結果を共有する
            </button>
        </div>
    `;
    
    document.getElementById('behavior-log').insertAdjacentHTML('afterend', relationHTML + npcHTML + rankingHTML + shareHTML);

    document.getElementById('share-btn').onclick = () => {
        let text = `深層認知診断 観測完了👁️\nソシオニクス: ${finalSocio}-${subtypeFunc} (${socioData.ranking[0].prob}%)\n推定MBTI: ${finalMbti}\nサイコソフィア: ${resultPsycho}\n\n#深層認知診断 #DeepCognitionArchive\nhttps://mofu-mitsu.github.io/Deep-Cognition-Archive/`;
        
        if (navigator.share) {
            navigator.share({ title: 'Deep Cognition Archive', text: text }).catch(console.error);
        } else {
            navigator.clipboard.writeText(text).then(() => {
                alert("診断結果をクリップボードにコピーしました！SNS等に貼り付けてシェアしてください。");
            });
        }
    };

    const GAS_URL = "https://script.google.com/macros/s/AKfycbyYheVL_4locE8gYOeBf7zMHQMBfI7tRmYumztZWs78UBagQLlKMQdnZbKbufOyDHkq/exec";
    
    let exportData = {
        subjectID: subjectID,
        selfReported: selfReportedType || "未入力",
        result: { mbti: finalMbti, socio: finalSocio, ennea: resultEnnea, sub: subtypeFunc, dcnh: resultDCNH },
        behaviorLogs: logs, comboScores: comboScore 
    };
    fetch(GAS_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(exportData) });

    const ctxRadar = document.getElementById('function-chart').getContext('2d');
    new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels:['Ti', 'Te', 'Ni', 'Ne', 'Fi', 'Fe', 'Si', 'Se'],
            datasets:[
                { label: 'Socionics', data:[socioScore.Ti, socioScore.Te, socioScore.Ni, socioScore.Ne, socioScore.Fi, socioScore.Fe, socioScore.Si, socioScore.Se], backgroundColor: 'rgba(201, 26, 37, 0.2)', borderColor: '#c91a25', borderWidth: 2 },
                { label: 'MBTI', data:[mbtiScore.Ti, mbtiScore.Te, mbtiScore.Ni, mbtiScore.Ne, mbtiScore.Fi, mbtiScore.Fe, mbtiScore.Si, mbtiScore.Se], backgroundColor: 'rgba(31, 111, 235, 0.2)', borderColor: '#1f6feb', borderWidth: 2 }
            ]
        }, options: { scale: { ticks: { beginAtZero: true, display: false }, pointLabels: { color: '#1a0b1c', font: { weight: 'bold' } } }, plugins: { legend: { labels: { color: '#1a0b1c' } } } }
    });

    const ctxBar = document.getElementById('bar-chart').getContext('2d');
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels:['Ti', 'Te', 'Ni', 'Ne', 'Fi', 'Fe', 'Si', 'Se'],
            datasets:[
                { label: 'Socionics', data:[socioScore.Ti, socioScore.Te, socioScore.Ni, socioScore.Ne, socioScore.Fi, socioScore.Fe, socioScore.Si, socioScore.Se], backgroundColor: '#c91a25', borderRadius: 4 },
                { label: 'MBTI 推定', data:[mbtiScore.Ti, mbtiScore.Te, mbtiScore.Ni, mbtiScore.Ne, mbtiScore.Fi, mbtiScore.Fe, mbtiScore.Si, mbtiScore.Se], backgroundColor: '#1f6feb', borderRadius: 4 }
            ]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true, grid: { color: '#e0e0e0' }, ticks: { color: '#1a0b1c' } }, x: { grid: { display: false }, ticks: { color: '#1a0b1c', font: { weight: 'bold' } } } }, plugins: { legend: { labels: { color: '#1a0b1c' } } } }
    });
    
    const ctxEnnea = document.getElementById('ennea-chart').getContext('2d');
    new Chart(ctxEnnea, {
        type: 'radar',
        data: {
            labels:['Type1', 'Type2', 'Type3', 'Type4', 'Type5', 'Type6', 'Type7', 'Type8', 'Type9'],
            datasets:[{ label: 'Enneagram 分布', data: [enneaScore[1], enneaScore[2], enneaScore[3], enneaScore[4], enneaScore[5], enneaScore[6], enneaScore[7], enneaScore[8], enneaScore[9]], backgroundColor: 'rgba(248, 81, 73, 0.2)', borderColor: '#f85149', pointBackgroundColor: '#f85149', borderWidth: 2 }]
        },
        options: { scale: { ticks: { beginAtZero: true, display: false }, pointLabels: { color: '#1a0b1c', font: { weight: 'bold' } } }, plugins: { legend: { display: false } } }
    });
}
