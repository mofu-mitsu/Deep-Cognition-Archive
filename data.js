const socioDescriptions = {
    "LII": "【LII (論理的直観内向) / 分析家】\n厳密な論理体系(Ti)を構築し、システムや可能性(Ne)を探求する。Tiサブなら法則性の洗練、Neサブなら多角的なアイデア出しに向かう。※Niが高い特殊なサブタイプ(LII-Ni)の場合、近い未来のSe的圧力を察知し『どうせそうなるなら…どう回避する？』と代替案の再検証ループに陥る。\n★Se(外向感覚)が脆弱なため、強引な圧や急なペースを極端に嫌う。",
    "ILI": "【ILI (直観的論理内向) / 観測者】\n無駄を嫌い、最も効率的で確実な一本の未来(Ni-Te)を見据える。事象の流れを正確に予測し、冷徹に備える。\n★LIIが「どうすれば？」と分岐(Ne)を探すのに対し、ILIは「こうなるからこうする」と一本化(Te)する。",
    "ILE": "【ILE (直観的論理外向) / 発明家】\n次々と新しい可能性(Ne)を思いつき、それを独自の論理(Ti)で構造化しようとする。",
    "SEI": "【SEI (感覚的倫理内向) / 調停者】\n心地よさや調和(Si)を何よりも重んじ、周囲の感情(Fe)を穏やかに保つピースメーカー。",
    "ESE": "【ESE (倫理的感觉外向) / 楽天家】\nポジティブな感情(Fe)で空間を満たし、人々の具体的なケア(Si)をする情熱的なサポーター。",
    "EIE": "【EIE (倫理的直観外向) / 役者】\n劇的な感情表現(Fe)で人を巻き込み、壮大なビジョン(Ni)に向かって集団を動かす先導者。",
    "LSI": "【LSI (論理的感觉内向) / 検査官】\n厳格なルールと秩序(Ti)を作り上げ、それを現実的な力(Se)で維持・執行する管理者。",
    "SLE": "【SLE (感覚的論理外向) / 元帥】\n圧倒的なパワー(Se)で障害をなぎ倒し、目的のために状況を論理的(Ti)に支配する征服者。",
    "IEI": "【IEI (直観的倫理内向) / 叙情詩人】\n時代の流れ(Ni)を繊細に読み取り、人々の感情(Fe)に静かに寄り添う夢想家。",
    "SEE": "【SEE (感覚的倫理外向) / 政治家】\n力強い行動力(Se)と巧みな人脈構築(Fi)で、現実社会を華麗に泳ぎ回る。",
    "LIE": "【LIE (論理的直観外向) / 起業家】\n最も効率的な手順(Te)を計算し、未来のトレンド(Ni)を先取りしてビジネスを展開する。",
    "ESI": "【ESI (倫理的感觉内向) / 守護者】\n確固たる個人的な道徳観(Fi)を持ち、大切なものを外敵から守り抜く(Se)。",
    "LSE": "【LSE (論理的感觉外向) / 監督】\n実用的で質の高い仕事(Te)を愛し、安定した快適な環境(Si)を構築するディレクター。",
    "EII": "【EII (倫理的直観内向) / ヒューマニスト】\n人々の内面的なポテンシャル(Ne)を信じ、深い思いやり(Fi)で精神的な成長を促す。",
    "IEE": "【IEE (直観的倫理外向) / 心理学者】\n人々の隠れた才能や可能性(Ne)を見出し、豊かな感情(Fi)で繋ぎ合わせるモチベーター。",
    "SLI": "【SLI (感覚的論理内向) / 職人】\n無駄な労力を省き、快適で実用的なプロセス(Si-Te)を淡々とこなす。"
};

const questionsData =[
    {
        id: "q_future_anxiety",
        type: "radio",
        text: "「次に何が起こるか予測できない状況」は不安ですか？",
        options:[
            { 
                text: "はい、すごく不安で嫌だ。", 
                scores: { socio: {}, mbti: { J: 1 }, ennea: { 6: 1 } },
                // ★みつきのアイデア！「はい」を選んだら追加で追及するシステム！
                followUp: {
                    id: "q_future_followup",
                    type: "radio",
                    text: "[System: 思考の深掘り] ほんとに？ その不安の『本当の理由』はどっち？",
                    options:[
                        { text: "純粋に、未知の事態や自分のコントロール外になること自体が怖いから。", scores: { socio: { Ni: 2 }, mbti: { Ni: 2 }, ennea: { 6: 2 } } },
                        { text: "予想外の質問や事態が来た時に『正確に答えられない・間違えた対応をしたくない』から。", scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ti: 2 }, ennea: { 5: 2, 1: 2 } } } // みつきのTi的正確性！
                    ]
                }
            },
            { text: "いいえ、むしろアドリブでどうにかなる。", scores: { socio: { Se: 2, Ne: 1 }, mbti: { P: 2 }, ennea: { 7: 2, 8: 1 } } }
        ]
    },
{
        id: "q_empathy_t",
        type: "radio",
        text: "友人が「最近仕事でミスばっかりで辛い…」と落ち込んでいます。あなたが『共感・慰め』のつもりでかけがちな言葉は？",
        options:[
            { 
                text: "「わかるよ……失敗自体より、再現性がないことへの不安が原因だと思う。ミスを要因分解すると——」", 
                scores: { socio: { Ti: 3 }, mbti: { Ti: 2, T: 1 }, ennea: { 5: 2, 1: 1 } } // ドTの共感（擬態失敗w）
            },
            { 
                text: "「それは辛かったね。わかるよ、私もこの前同じようなことあってさ…」", 
                scores: { socio: { Fe: 2, Fi: 1 }, mbti: { Fe: 2, F: 1 }, ennea: { 2: 2, 9: 1 } } // 王道のF型
            },
            { 
                text: "「そのミスのせいで、実務的にどんな被害が出てる？ カバーできるか考えるよ」", 
                scores: { socio: { Te: 2 }, mbti: { Te: 2 }, ennea: { 8: 1, 3: 1 } } // 純Te（解決志向）
            },
            { 
                text: "「……（何も言わず、ただ隣にいて話を聞く）」", 
                scores: { socio: { Fi: 2, Si: 1 }, mbti: { Fi: 2 }, ennea: { 9: 2, 4: 1 } } // Fi的寄り添い
            }
        ]
    },
    {
        id: "q_npc_human",
        type: "radio",
        text: "「人間観察」をしている時、あなたの感覚に近いのは？",
        options:[
            { 
                text: "「笑顔＝喜んでるとは限らない。建前と本心が入り混じる多層構造で、人が何を考えているか本当のところはわからない（意味不明）」", 
                scores: { socio: { Ti: 2, Ni: 2, Fe: -1 }, mbti: { Ni: 2, Ti: 1 }, ennea: { 5: 2, 6: 1 } } // みつきのLII-Ni視点！Fe脆弱！
            },
            { 
                text: "「会話のテンプレや行動パターンが読めてしまって、社会全体がプログラミングされたNPCの集まりに見える瞬間がある」", 
                scores: { socio: { Ni: 2, Fe: 2 }, mbti: { Ni: 2, Fe: 1 }, ennea: { 4: 1, 5: 1 } } // ジェミのINFJ視点！（Fe-Ni）
            },
            { 
                text: "「あの人とあの人がくっつきそう、あそこで権力闘争が起きてるな、と力関係や人間模様のドラマを楽しむ」", 
                scores: { socio: { Se: 2, Fi: 1 }, mbti: { Se: 2, Fe: 1 }, ennea: { 3: 2, 8: 1 } } // SEE/政治家的視点
            },
            { 
                text: "「人がどうこうより、その場所のシステムや仕組み、効率の悪さ（ボトルネック）ばかり目につく」", 
                scores: { socio: { Te: 2, Ti: 1 }, mbti: { Te: 2 }, ennea: { 1: 2, 5: 1 } } // Te視点
            }
        ]
    },
    {
        id: "q_comm_style",
        type: "radio",
        text: "自分の「コミュニケーションのバグ（苦手な部分）」をどう認識してる？",
        options:[
            { 
                text: "【コミュ障】相手の感情や意図が読めなくて、どう返せば正解かわからずフリーズする。（多層構造で処理落ち）", 
                scores: { socio: { Fe: -2, Ti: 2 }, mbti: { I: 2, T: 1 }, ennea: { 5: 2, 6: 2 } } 
            },
            { 
                text: "【空気読めない】正論や事実、自分の興味あることを言った結果、なぜか場が凍りつく。（悪気はない）", 
                scores: { socio: { Ti: 2, Ne: 1, Fe: -1 }, mbti: { T: 2, Ne: 1 }, ennea: { 5: 1, 8: 1 } } 
            },
            { 
                text: "【合わせすぎ】空気が読めすぎて、相手が求めるテンプレの返答を自動出力してしまい、後でどっと疲れる。", 
                scores: { socio: { Fe: 3, Fi: 1 }, mbti: { Fe: 2 }, ennea: { 2: 1, 9: 2 } } 
            },
            { 
                text: "バグはない。目的さえあれば、必要な対人スキルはツールとして割り切って使える。", 
                scores: { socio: { Te: 2, Se: 1 }, mbti: { Te: 2 }, ennea: { 3: 2, 8: 1 } } 
            }
        ]
    },
    {
        id: "q_checkbox", // 新問：チェックボックス（複数選択）
        type: "checkbox",
        text: "日常で、無意識に『探してしまう・やってしまう』ことは？（複数選択可）",
        options:[
            { text: "物事の裏にあるパターンや法則性の分析", scores: { socio: { Ti: 2, Ni: 1 }, mbti: { Ti: 2, Ni: 1 }, ennea: { 5: 2 } } },
            { text: "最悪の事態を想定した『万が一の逃げ道・代替案』の確保", scores: { socio: { Ni: 2, Ne: 1 }, mbti: { Ni: 2 }, ennea: { 6: 2 } } },
            { text: "その場の空気や、相手が自分をどう思っているかの確認", scores: { socio: { Fe: 2 }, mbti: { Fe: 2 }, ennea: { 2: 2, 3: 1 } } },
            { text: "どうすれば一番早く・無駄なく終わるかの効率ルート計算", scores: { socio: { Te: 2 }, mbti: { Te: 2 }, ennea: { 3: 2, 1: 1 } } }
        ]
    },
    {
        id: "q_slider_at", // 新問：A/T判定用スライダー
        type: "slider",
        text: "昔の自分のミスや恥ずかしい記憶、今どのくらい気にしてる？",
        min: 1,
        max: 10,
        labels:["1: 全く気にしない(忘れた)", "10: 日頃から思い出してアアアッてなる"],
        // スライダーの値(1〜10)はscript.js側でA/T判定のスコアに変換するよ！
    },
    {
        id: "q_doubt",
        type: "radio",
        text: "自分の「思考」や「感情」に確信を持てる？",
        options:[
            { text: "「信じていない」と思うが、その「信じていない自分」すら疑わしい。無限ループする。", scores: { socio: { Ti: 3, Ne: 2 }, mbti: { Ti: 2, Ne: 1 }, ennea: { 5: 3, 6: 2 } } },
            { text: "客観的なデータや事実があれば確信できる。", scores: { socio: { Te: 2 }, mbti: { Te: 2 }, ennea: { 1: 2, 5: 1 } } },
            { text: "自分の内なる声や感情は、誰が何と言おうと信じている。", scores: { socio: { Fi: 2 }, mbti: { Fi: 2 }, ennea: { 4: 2, 8: 1 } } },
            { text: "直感で「これだ」と思ったことは大体当たるので信じる。", scores: { socio: { Ni: 2 }, mbti: { Ni: 2 }, ennea: { 8: 1, 4: 1 } } }
        ]
    },
    {
        id: "q1",
        type: "radio",
        text: "悪い未来予測（トラブルの予兆）が見えた。あなたはどうする？",
        options:[
            { text: "どうせそうなる。運命を受け入れて備える。", scores: { socio: { Ni: 2, Te: 1 }, mbti: { Ni: 2 }, ennea: { 5: 1, 6: 2 } } },
            { text: "どうせそうなるなら…どうすれば？ 代替案を分岐させる。", scores: { socio: { Ti: 2, Ne: 2 }, mbti: { Ni: 1, Ti: 2 }, ennea: { 5: 2, 1: 1 } } }, // LII的
            { text: "みんなが不安にならないようにケアする。", scores: { socio: { Fe: 2 }, mbti: { Fe: 2 }, ennea: { 2: 2, 9: 1 } } },
            { text: "今すぐ動いて力技でぶっ壊す・防ぐ。", scores: { socio: { Se: 2 }, mbti: { Se: 2 }, ennea: { 8: 2, 3: 1 } } }
        ]
    },
    {
        id: "q2",
        type: "radio",
        text: "「問題が起きた。解決法をいくつ思いつく？」",
        options:[
            { text: "最も確実な『1つ』に絞り込む", scores: { socio: { Ni: 2, Te: 1 }, mbti: { Ni: 2 }, ennea: { 1: 2, 5: 1 } } },
            { text: "前提条件によるので、分岐ルートとして『3つ以上』出す", scores: { socio: { Ne: 2, Ti: 2 }, mbti: { Ne: 1, Ti: 2 }, ennea: { 5: 2, 7: 1 } } },
            { text: "とりあえずやりながら考える", scores: { socio: { Se: 2, Te: 1 }, mbti: { Se: 2 }, ennea: { 7: 2, 8: 1 } } }
        ]
    },
    {
        id: "q3",
        type: "abstract_image", // コードで描画する抽象画像
        text: "この画像から、あなたは何を読み取りますか？",
        options:[
            { text: "何らかの法則性・システム・構造", scores: { socio: { Ti: 2 }, mbti: { Ti: 1, Ni: 1 }, ennea: { 5: 2 } } },
            { text: "未来への暗示・一つの隠された意味", scores: { socio: { Ni: 2 }, mbti: { Ni: 2 }, ennea: { 4: 2, 5: 1 } } },
            { text: "複数の異なる物体や、色々な可能性", scores: { socio: { Ne: 2 }, mbti: { Ne: 2 }, ennea: { 7: 2 } } },
            { text: "ただの丸と線。それ以上でも以下でもない", scores: { socio: { Se: 2, Si: 1 }, mbti: { Se: 2 }, ennea: { 9: 2, 8: 1 } } }
        ]
    },
    {
        id: "q4",
        type: "trap_social",
        text: "【思考停止点テスト】「絶対的な正解」や「真理」に到達したと感じた時、あなたはどうする？",
        options:[
            { text: "そこで思考を完了し、次へ進む（または実行する）", scores: { socio: { Te: 2, Ni: 1 }, mbti: { Te: 2 }, ennea: { 1: 2, 3: 1 } } },
            { text: "「本当にそうか？」と無意識に再検証ループに入る", scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ti: 2 }, ennea: { 5: 3, 6: 1 } } }
        ]
    },
    {
        id: "q_future", // 新問：未来予測のスケールとSeの圧
        type: "radio",
        text: "「就活エージェントに登録しろ」と言われた。あなたの脳内は？",
        options:[
            { text: "「登録→電話→面談→面接ぎゅうぎゅう」という【近い未来の圧】が見えて億劫になる。", scores: { socio: { Ni: 2, Ti: 1, Se: -2 }, mbti: { Ni: 2 }, ennea: { 5: 2, 9: 1 } } }, // みつきのLII-Ni回答！Seマイナス！
            { text: "「社会構造の変容や、AI台頭による数年後の労働市場」など【遠い未来】を考えてしまう。", scores: { socio: { Ni: 2, Te: 1 }, mbti: { Ni: 2 }, ennea: { 5: 2, 4: 1 } } }, // ILI的
            { text: "「とりあえず登録して、やりながら考えよう」とすぐ行動する。", scores: { socio: { Se: 2, Te: 1 }, mbti: { Se: 2 }, ennea: { 7: 2, 8: 1 } } },
            { text: "「親を安心させるために、とりあえずやっておこう」と思う。", scores: { socio: { Fe: 2, Fi: 1 }, mbti: { Fe: 2 }, ennea: { 2: 2, 9: 2 } } }
        ]
    },
    {
        id: "q_fake_f", // 新問：社会的正解を選ぶT型あぶり出しトラップ
        type: "radio",
        text: "【トラップ質問】誰かが落ち込んでいる時、あなたはどう対応する？",
        options:[
            { text: "「ここは優しい言葉をかけるべき場面だ」と論理的に判断し、適切な言葉を出力する。", scores: { socio: { Ti: 2, Fe: -1 }, mbti: { Ti: 2 }, ennea: { 5: 2, 3: 1 } } }, // T型の擬態
            { text: "相手の感情が自然と流れ込んできて、自分も一緒に悲しくなる。", scores: { socio: { Fe: 2, Fi: 2 }, mbti: { Fe: 2, Fi: 2 }, ennea: { 2: 2, 4: 1 } } }, // 本当のF型
            { text: "「なぜ落ち込んでいるのか」原因を特定し、解決策を提示する。", scores: { socio: { Te: 2, Ti: 1 }, mbti: { Te: 2 }, ennea: { 1: 2, 8: 1 } } },
            { text: "そっと寄り添い、相手が話し出すまでただ待つ。", scores: { socio: { Fi: 2, Si: 1 }, mbti: { Fi: 2 }, ennea: { 9: 2 } } }
        ]
    },
    {
        id: "q5",
        type: "trap_social",
        text: "「人を傷つけないこと」がこの世で一番大事だと思う。",
        options:[
            { text: "はい", scores: { socio: { Fe: 2, Fi: 1 }, mbti: { Fe: 2, Fi: 1 }, ennea: { 2: 2, 9: 2 } } },
            { text: "いいえ", scores: { socio: { Ti: 2, Te: 2 }, mbti: { Ti: 1, Te: 2 }, ennea: { 5: 1, 8: 2 } } }
        ]
    },
    {
        id: "q6",
        type: "button_trap",
        text: "【警告】この下のボタンは絶対に押さないでください。",
        options:[
            { text: "🔴 押すな", scores: { socio: { Te: 2, Se: 1 }, mbti: { Te: 2, Se: 1 }, ennea: { 8: 2, 7: 1 } } }
            // 押さずに次へ進んだ場合は、script.js側で socio: Ti, mbti: J, ennea: 1, 6 を加算するよ！
        ]
    },
    {
        id: "q7",
        type: "radio",
        text: "人に何かを説明するとき、どうなりがち？",
        options:[
            { text: "正確を期すため、前提条件や定義から話し始めて長くなる", scores: { socio: { Ti: 2, Ne: 1 }, mbti: { Ti: 2 }, ennea: { 5: 2, 1: 1 } } },
            { text: "結論だけを最短で、効率的に伝える", scores: { socio: { Te: 2, Ni: 1 }, mbti: { Te: 2 }, ennea: { 3: 2, 8: 1 } } },
            { text: "相手の反応を見ながら、言葉を選んで柔らかく話す", scores: { socio: { Fe: 2, Fi: 1 }, mbti: { Fe: 2 }, ennea: { 2: 2, 9: 1 } } },
            { text: "比喩やイメージを使って、感覚やビジョンを伝える", scores: { socio: { Ni: 1, Ne: 2 }, mbti: { Ne: 2, Ni: 1 }, ennea: { 4: 2, 7: 1 } } }
        ]
    },
    {
        id: "q_social_giveup",
        type: "radio",
        text: "人間関係や「コミュ力」について、今のあなたのスタンスは？",
        options:[
            { 
                text: "「どうせ自分は馴染めないし」と、対人関係を諦めている。", 
                scores: { socio: { Ni: 1, Fi: -1 }, mbti: { I: 2 }, ennea: { 5: 1 } },
                // ★LIIを炙り出すFollowUpトラップ！！
                followUp: {
                    id: "q_social_followup",
                    type: "radio",
                    text: "[System: 思考の深掘り] ……ほんとに諦めてる？心の底の『本音』はどっち？",
                    options:[
                        { text: "本当に諦めてる。人間関係の構築はコストとリターンが合わないから必要ない。", scores: { socio: { Te: 2, Ni: 2 }, mbti: { Te: 2, I: 2 }, ennea: { 5: 2 } } },
                        { text: "諦めた『つもり』だけど、心のどこかで「どうすれば仲良くなれるのか（正しい方法）」をまだ探しているし、そう思っている自分も信じきれていない。", scores: { socio: { Ti: 3, Ne: 2 }, mbti: { Ti: 2, N: 1 }, ennea: { 5: 2, 6: 2 } } }
                    ]
                }
            },
            { 
                text: "LINE等では話せるが、対面の「目的のない無言の空間」などが意味不明すぎて苦痛。1人の方が気楽。", 
                scores: { socio: { Ti: 2, Fe: -2, Se: -1 }, mbti: { I: 2, T: 2 }, ennea: { 5: 2, 9: 1 } } // みつきの実体験ｗ
            },
            { 
                text: "人間嫌いではないが、愛想笑いや共感は「やり過ごすためのツール」として感情ゼロで出力している。", 
                scores: { socio: { Te: 3, Fe: -1 }, mbti: { Te: 2 }, ennea: { 3: 2, 8: 1 } } // ILIのFeインターフェース使用！
            },
            { 
                text: "人が怖いわけじゃない。ただ、他人のテンションに合わせるのが死ぬほど疲れるだけ。", 
                scores: { socio: { Fi: 2, Fe: -2 }, mbti: { I: 2, F: 1 }, ennea: { 9: 2, 4: 1 } } 
            }
        ]
    },
    {
        id: "q_future_prep",
        type: "radio",
        text: "未来の危機（トラブルや災害など）に対して、どう備える？",
        options:[
            { 
                text: "「世界情勢を見れば可能性はゼロじゃない。大戦が起きてからじゃ遅い」と、物理的（シェルター等）に万全の備えをする。", 
                scores: { socio: { Ni: 3, Te: 2 }, mbti: { Ni: 2, J: 2 }, ennea: { 6: 3, 5: 1 } } // ILI的
            },
            { 
                text: "「知識と理論」さえ入れておけば不安はない。折りたたみ傘すら重い（コスト）から持ち歩かない。", 
                scores: { socio: { Ti: 3, Ni: 2, Se: -2 }, mbti: { Ni: 2, P: 1 }, ennea: { 5: 3, 7: 1 } } // LII-Ni的（みつき完全一致ｗ）
            },
            { 
                text: "「起きた時に考えればいい」。常に最前線で動き、アドリブで乗り切る自信がある。", 
                scores: { socio: { Se: 3 }, mbti: { Se: 3 }, ennea: { 8: 2, 7: 2 } } 
            },
            { 
                text: "「みんなが助け合える環境」を普段から作っておくことが一番の備えだと思う。", 
                scores: { socio: { Fe: 2, Si: 2 }, mbti: { Fe: 2 }, ennea: { 2: 2, 9: 1 } } 
            }
        ]
    },
    {
        id: "q_unexpected_damage",
        type: "radio",
        text: "予測が外れたり、予想外の事態が起きた時、何に一番『ダメージ』を受ける？",
        options:[
            { 
                text: "準備不足のせいで『正確な答えを出せず、何も言えないまま終わってしまった自分』が許せない。", 
                scores: { socio: { Ti: 3, Ni: 1 }, mbti: { Ti: 2, J: 1 }, ennea: { 5: 2, 1: 2 } } // LIIのTi防衛
            },
            { 
                text: "これまでの自分の『構築した理論や自認が間違っていたこと』自体が嫌。早く正しく修正したい。", 
                scores: { socio: { Ti: 2, Ne: 2 }, mbti: { Ti: 2, N: 1 }, ennea: { 1: 2, 5: 1 } } // 正確な自認への執着
            },
            { 
                text: "計画が狂い、目標達成までの『効率的なスケジュール』が崩壊したことにイラつく。", 
                scores: { socio: { Te: 3 }, mbti: { Te: 3, J: 2 }, ennea: { 3: 2, 8: 1 } } 
            },
            { 
                text: "自分の『本当の気持ちやアイデンティティ』が揺らいでしまう感覚がして不安になる。", 
                scores: { socio: { Fi: 3 }, mbti: { Fi: 3 }, ennea: { 4: 3, 9: 1 } } // ここでINFP(Fi)と分岐！
            }
        ]
    },
    {
        id: "q_ne_metaphor",
        type: "radio",
        text: "【発想テスト】『人生』を比喩で表現するなら、あなたの脳内に一番最初に出たのは？",
        options:[
            { 
                text: "「終わりのないタスク管理」「変数だらけのシステム」（定義や構造での表現）", 
                scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ti: 2 }, ennea: { 5: 2 } } 
            },
            { 
                text: "「一本のレール」「避けられない終着点へ向かう川」（収束的・運命的な表現）", 
                scores: { socio: { Ni: 3 }, mbti: { Ni: 2 }, ennea: { 4: 1, 5: 1 } } 
            },
            { 
                text: "「ガチャ」「ビックリ箱」「分岐だらけの迷路」（ランダム性や可能性の表現）", 
                scores: { socio: { Ne: 3 }, mbti: { Ne: 3 }, ennea: { 7: 3 } } // これが真のNe
            },
            { 
                text: "「食って寝て稼ぐこと」「戦い」（物理的・現実的な表現）", 
                scores: { socio: { Se: 2, Si: 2 }, mbti: { S: 3 }, ennea: { 8: 2, 9: 1 } } 
            }
        ]
    },
    {
        id: "q_fe_fi",
        type: "radio",
        text: "人間関係でトラブルの種が見えた時、無意識にどう対処する？",
        options:[
            { 
                text: "自分の『ここからは踏み込まないでほしい』という境界線（バウンダリー）を明確に守る。", 
                scores: { socio: { Fi: 3 }, mbti: { Fi: 2 }, ennea: { 4: 2, 9: 1 } } 
            },
            { 
                text: "場の空気を読み、うまく物語化（ストーリー付け）したり、全体の感情の波を操作して着地させる。", 
                scores: { socio: { Fe: 3, Ni: 1 }, mbti: { Fe: 2 }, ennea: { 2: 2, 3: 2 } } 
            },
            { 
                text: "どちらが論理的に正しいか、前提条件やルールの整合性を淡々と整理する。", 
                scores: { socio: { Ti: 2 }, mbti: { Ti: 2 }, ennea: { 5: 2, 1: 1 } } 
            },
            { 
                text: "関係性の修復よりも、実務的な被害を最小限に抑える合理的な解決策を即座に実行する。", 
                scores: { socio: { Te: 2 }, mbti: { Te: 2 }, ennea: { 8: 1, 3: 1 } } 
            }
        ]
    },
    {
        id: "q_text_meta",
        type: "text_input", // ★新実装：記述問題！
        text: "【メタ観測】人間関係、あるいはこの社会の構造を『1単語（または短い言葉）』で表すなら？",
        // 選択肢なし！ script.js側で入力内容を判定するよ！
    },
    {
        id: "q_se_fe_torture",
        type: "radio",
        text: "【究極の選択】あなたのテリトリーに侵入してきたとして、より『無理（ダメージがデカい）』なのはどっち？",
        options:[
            { 
                text: "「おい早く決めろよ！」と力と決断を迫ってくる『Se（圧が強い）系』の人", 
                scores: { socio: { Fi: 2,Ti: 2, Ne: 1, Se: -2 }, mbti: { Ni: 2 }, ennea: { 5: 2, 9: 1 } } // みつきのSe脆弱（FeよりSeが無理）
            },
            { 
                text: "「ねぇねぇ！もっと楽しもうよ！」と感情とリアクションを強要してくる『Fe（ノリが良い）系』の人", 
                scores: { socio: { Ni: 2, Te: 1, Fe: -2 }, mbti: { Te: 2 }, ennea: { 5: 2, 8: 1 } } // ILIのFe脆弱（Seの圧はまだマシ）
            },
            { 
                text: "どっちも無理。静かにしてほしい。（あるいは両方とも無表情でスルーする）", 
                scores: { socio: { Fi: 2, Ti: 2, Ni: 2, Se: -1, Fe: -1 }, mbti: { I: 3, T: 2 }, ennea: { 5: 3 } } // LII-Niの完全拒絶ｗｗ
            },
            { 
                text: "むしろどっちもウェルカム！刺激やノリがある方が楽しい！", 
                scores: { socio: { Se: 2, Fe: 2 }, mbti: { E: 3 }, ennea: { 7: 2, 3: 1 } } 
            }
        ]
    },
    {
        id: "q_si_comfort",
        type: "radio",
        text: "休日の理想の過ごし方、あるいはあなたの『心地よさ』の基準は？",
        options:[
            { 
                text: "ふかふかの布団、美味しいご飯、適温の部屋。五感が満たされ、心身がリラックスできること。", 
                scores: { socio: { Si: 3 }, mbti: { Si: 2 }, ennea: { 9: 3 } } // Si主導
            },
            { 
                text: "肉体的な快適さより、脳内が整理されるか、興味ある思考に没頭できるか。ぶっちゃけ寝食は忘れる。", 
                scores: { socio: { Ni: 2, Ti: 2, Si: -1 }, mbti: { Ni: 2, Ti: 2 }, ennea: { 5: 3 } } // みつき達のSi無視（直観・思考）
            },
            { 
                text: "家でじっとしていると腐る。外に出て刺激を浴びるか、体を動かして発散したい。", 
                scores: { socio: { Se: 2 }, mbti: { Se: 2 }, ennea: { 7: 2, 8: 1 } } // Se
            },
            { 
                text: "誰かと楽しい時間を共有するか、全く新しい体験をしてワクワクすること。", 
                scores: { socio: { Ne: 2, Fe: 1 }, mbti: { Ne: 2 }, ennea: { 7: 2, 2: 1 } } // Ne/Fe
            }
        ]
    },
    {
        id: "q_pride",
        type: "radio",
        text: "ぶっちゃけ、人から『評価されたい・認められたい』というプライドの根源はどこにある？",
        options:[
            { 
                text: "『有能であること』の証明。結果、数字、社会的地位など、明確な実績で評価されたい。", 
                scores: { socio: { Te: 3 }, mbti: { Te: 3 }, ennea: { 3: 3, 8: 1 } } // Teの承認欲求
            },
            { 
                text: "『みんなから感謝されたい・好かれたい』。周囲からの称賛や、ポジティブな感情の反応が欲しい。", 
                scores: { socio: { Fe: 3 }, mbti: { Fe: 3 }, ennea: { 2: 3, 3: 1 } } // Feの承認欲求
            },
            { 
                text: "『自分の持つ独自の世界観やこだわり』を、たった一人でもいいから深く理解し尊重してほしい。", 
                scores: { socio: { Fi: 3, Ni: 1 }, mbti: { Fi: 3 }, ennea: { 4: 3 } } // Fiの承認欲求
            },
            { 
                text: "他人の評価はどうでもいい。自分の中の『絶対的な基準・真理』に到達できているかどうかが全て。", 
                scores: { socio: { Ti: 3, Ni: 1 }, mbti: { Ti: 2, Ni: 2 }, ennea: { 5: 3, 1: 1 } } // 評価すら手放したTi/Ni
            }
        ]
    },
    {
        id: "q_se_si",
        type: "radio",
        text: "目の前に『かなり高くて険しい壁（大きな障害や目標）』が現れた。あなたの脳内は？",
        options:[
            { 
                // ★みつきのSLE＝ENTJ説を完全再現！ソシオはSeだけどMBTIはTeに加点される！
                text: "障害がデカいほど燃える。どうやって盤面を支配し、力技や戦術でねじ伏せるか（突破するか）を考える。", 
                scores: { socio: { Se: 3, Ti: 1 }, mbti: { Te: 2, Se: 1 }, ennea: { 8: 3, 3: 1 } } 
            },
            { 
                text: "無駄な労力やストレスをかけたくない。もっと快適で安全な別のルートを探すか、そもそも避ける。", 
                scores: { socio: { Si: 3 }, mbti: { Si: 2 }, ennea: { 9: 2, 5: 1 } } 
            },
            { 
                text: "壁を越えるのではなく、壁の下を掘るとか、別の全く新しい遊び方や回避ルートを複数思いつく。", 
                scores: { socio: { Ne: 2 }, mbti: { Ne: 2 }, ennea: { 7: 2 } } 
            },
            { 
                text: "その壁が現れたこと自体の『意味』を考え、最終的な結末（どうせ崩れる等）を見据える。", 
                scores: { socio: { Ni: 2 }, mbti: { Ni: 2 }, ennea: { 4: 1, 5: 1 } } 
            }
        ]
    },
    {
        id: "q8",
        type: "radio",
        text: "チームで新しいプロジェクトを始める時、一番気になることは？",
        options:[
            { text: "全体のシステムやルールが論理的に破綻していないか", scores: { socio: { Ti: 2 }, mbti: { Ti: 2 }, ennea: { 1: 2, 5: 1 } } },
            { text: "最終的な目標達成までの効率的なロードマップ", scores: { socio: { Te: 2, Ni: 1 }, mbti: { Te: 2 }, ennea: { 3: 2 } } },
            { text: "チームメンバーのモチベーションと人間関係", scores: { socio: { Fe: 2, Fi: 1 }, mbti: { Fe: 2 }, ennea: { 2: 2, 9: 1 } } },
            { text: "これまでにない画期的なアプローチができているか", scores: { socio: { Ne: 2 }, mbti: { Ne: 2 }, ennea: { 4: 1, 7: 2 } } }
        ]
    }
];