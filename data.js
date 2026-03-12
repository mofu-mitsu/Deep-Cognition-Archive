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
        id: "q_lii_subtype",
        type: "radio",
        text: "複雑なシステムや興味のある分野を深掘りしている時、あなたの脳内はどこに向かう？",
        options:[
            { 
                text: "【法則の洗練】矛盾を完全に消し去り、たった一つの完璧で美しい『真理・法則』を構築したい。", 
                scores: { socio: { Ti: 4 }, mbti: { Ti: 3 }, ennea: { 5: 3, 1: 2 } } // LII-Ti サブタイプ爆上がり！
            },
            { 
                text: "【可能性の拡散】「これをあっちに応用したら？」「こんな裏技もあるかも！」と、新しい可能性が次々と枝分かれして広がる。", 
                scores: { socio: { Ne: 4 }, mbti: { Ne: 3 }, ennea: { 7: 3, 5: 1 } } // LII-Ne サブタイプ爆上がり！
            },
            { 
                text: "【圧の回避】「このシステムが将来どう自分に影響するか（面倒事）」を予測し、それを回避する『代替案』の計算に思考を割く。", 
                scores: { socio: { Ni: 4 }, mbti: { Ni: 3 }, ennea: { 5: 3, 6: 2 } } // みつきの LII-Ni サブタイプ爆上がり！
            },
            { 
                text: "【現実・関係性】正直どれもピンとこない。システムや法則より、現実の生活や人との関わり（誰かの役に立つか等）の方が大事だ。", 
                scores: { socio: { Si: 2, Fe: 2 }, mbti: { Si: 2, Fe: 2 }, ennea: { 9: 2, 2: 2 } } // S/F型用
            }
        ]
    },
    {
        id: "q_ni_vs_si",
        type: "radio",
        text: "「変わらない日常」や「普通でいること」について、どう思う？",
        options:[
            { 
                text: "一番大事。自分の確固たる信念やマイルールを守り、波風を立てず平穏で快適な毎日が続くのが最高の幸せ。", 
                scores: { socio: { Si: 2, Fi: 4 }, mbti: { Si: 3 }, ennea: { 9: 3, 1: 1 } } // ISxJ / LSI / ESI のSi-Fi的保守
            },
            { 
                text: "そんなものは幻想。世界は常に変動しており、いずれ今の日常も崩れる（または変わる）とどこかで常に思っている。", 
                scores: { socio: { Ni: 3 }, mbti: { Ni: 3 }, ennea: { 5: 2, 4: 1 } } // Niの未来変動予測
            },
            { 
                text: "退屈で死にそうになる。常に新しい刺激や、自分がトップに立つための闘争・変化を求めている。", 
                scores: { socio: { Se: 3 }, mbti: { Se: 3 }, ennea: { 8: 3, 7: 1 } } 
            },
            { 
                text: "平穏もいいけど、ふと思いついた面白いことにいつでも飛び込める自由と変化は欲しい。", 
                scores: { socio: { Ne: 3 }, mbti: { Ne: 3, P: 2 }, ennea: { 7: 3 } } 
            }
        ]
    },
    {
        id: "q_a_or_t_decision",
        type: "radio",
        text: "自分の過去の大きな決断（進路や人間関係など）を振り返った時、どう感じる？",
        options:[
            { 
                text: "「あの時はあれがベストだった」「自分が選んだ道だから」と納得しており、後悔や未練は全くない。", 
                scores: { socio: { Se: 1, Te: 1 }, mbti: { Te: 1 }, ennea: { 8: 2, 3: 1 } },
                nervousnessDelta: -3 // ★A型（自己主張）に大きく傾く！
            },
            { 
                text: "「まあ失敗もあったけど、なんとかなってるし」と楽観的に捉えている。", 
                scores: { socio: { Ne: 1 }, mbti: { Ne: 1 }, ennea: { 7: 2, 9: 1 } },
                nervousnessDelta: -1 // A寄り
            },
            { 
                text: "「もしあっちを選んでいたら…」「あれは間違っていたのでは…」と、定期的に別の世界線を考えて悩む。", 
                scores: { socio: { Ni: 1, Fi: 1 }, mbti: { Ni: 1 }, ennea: { 4: 2, 6: 2 } },
                nervousnessDelta: 2 // T型（慎重）に傾く
            },
            { 
                text: "決断そのものより、「決断に至るまでの自分の理論（前提）」が間違っていたことに気づくと、激しく自己懐疑ループに入る。", 
                scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ti: 2, Ni: 1 }, ennea: { 5: 3, 1: 1 } }, // LIIのドTループ
                nervousnessDelta: 3 // ドT型（激しい自己検証）に傾く！
            }
        ]
    },
    {
        id: "q_minigame_number",
        type: "minigame_number", // ★新実装！ミニゲーム！
        text: "【認知行動テスト】1から100までの数字が高速でカウントされます。好きなタイミングで「STOP」を押してください。",
        // 選択肢はscript.js側で動的に生成するよ！
    },
{
        id: "q_goodwill_cost", // ★みつきの神エピソード「善意の構造とコスト」！
        type: "radio",
        text: "他人から不意に「見返りを求めない親切（善意）」を向けられた時、あなたの内心はどうなる？",
        options:[
            { 
                text: "「なぜリスクを背負ってまで踏み込んでくるのか読めない」。自分を起点に関係性（貸し借り）が拡張する構造はノイズになるので、できれば突き返したい。", 
                scores: { socio: { Ti: 3, Ni: 2, Fe: -2 }, mbti: { Ti: 3, Ni: 2 }, ennea: { 5: 3, 1: 1 } } // みつきのLII-Ni的構造分析！
            },
            { 
                text: "素直に嬉しいし、心が温かくなる。私もお返しをして、もっと仲良くなりたい！", 
                scores: { socio: { Fe: 5, Fi: 4 }, mbti: { Fe: 3, Fi: 2 }, ennea: { 2: 3, 9: 2 } } // 純F型
            },
            { 
                text: "内心は困惑するが、「ここで拒絶すると『内集団バイアス』から外れ、排他的な標的にされるリスクがある」と計算し、愛想よく受け取る。", 
                scores: { socio: { Te: 2, Ti: 1, Fe: 1 }, mbti: { Te: 2, Ti: 2 }, ennea: { 5: 2, 6: 2 } } // T型の「生存戦略としてのFe擬態」ｗｗ
            },
            { 
                text: "「タダより高いものはない」。裏に絶対何かメリットや目的（下心）があると疑い、利用されないよう警戒する。", 
                scores: { socio: { Ni: 3, Te: 2 }, mbti: { Ni: 3, Te: 2 }, ennea: { 8: 2, 6: 1 } } // ILI/INTJのシニカルな警戒
            }
        ]
    },
    {
        id: "q_esi_ethics_trap", // ★ESI(Fi)の倫理と、T型の社会的正解を分けるトラップ！
        type: "radio",
        text: "【倫理テスト】いじめや裏切りなど、道徳的に許されない行為を見た時、あなたはどう感じる？",
        options:[
            { 
                text: "「絶対に許せない！」と激しい怒りや悲しみを感じ、被害者のために立ち上がりたくなる。", 
                scores: { socio: { Fi: 2, Fe: 1 }, mbti: { Fi: 2, Fe: 1 }, ennea: { 1: 2, 8: 1 } },
                // ★エセF型を炙り出す鬼トラップ！！
                followUp: {
                    id: "q_esi_ethics_followup",
                    type: "radio",
                    text: "👁️ [System: 思考の深掘り] ほんとに？ その『許せない』の根源（理由）はどっち？",
                    options:[
                        { text: "私自身の『絶対に譲れない大切な価値観（信念）』が穢されたから。生理的・個人的な嫌悪感として怒っている。", scores: { socio: { Fi: 5, Se: 2 }, mbti: { Fi: 4 , Fe: 4 }, ennea: { 4: 2, 1: 2 } } }, // 真のFi（ESI等）
                        { text: "いや、感情というより『社会のルールとして非合理的だから』『集団の利益や構造を損なうバグだから』、正すべきだと論理的に判断しただけ。", scores: { socio: { Ti: 3, Te: 2, Fi: -3 }, mbti: { Ti: 3, Te: 2, Fi: -3 }, ennea: { 5: 2, 1: 2 } } } // T型の正義感擬態！Fiマイナス！
                    ]
                }
            },
            { 
                text: "「人間なんてそんなもんだ」と冷観し、自分に実害がない限りはノータッチを貫く。", 
                scores: { socio: { Ni: 2, Te: 2 }, mbti: { Ni: 2, Te: 2 }, ennea: { 5: 2, 9: 1 } } // ILI等
            },
            { 
                text: "「なぜその行為が発生したのか？」という環境的・構造的な原因を、感情を交えずに分析し始める。", 
                scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ti: 3, Ni: 1 }, ennea: { 5: 3 } } // LIIの分析
            },
            { 
                text: "その行為自体よりも、全体の空気が悪くなり、自分の平穏な日常が脅かされることが嫌だ。", 
                scores: { socio: { Si: 3, Fe: 1 }, mbti: { Si: 3, Fe: 1, Fi: 2  }, ennea: { 9: 3, 6: 1 } } // Siの平和主義
            }
        ]
    },
    {
        id: "q_creation_purpose", // ★チャッピー提案：作品作りの目的
        type: "radio",
        text: "もしあなたが何か「自分の作品（絵、文章、システム等）」を作るとしたら、一番の目的・表現したいことは？",
        options:[
            { 
                text: "複雑な概念や、自分が見出した『世界の法則・構造』を美しく組み上げて表現すること。", 
                scores: { socio: { Ti: 3, Ni: 2 }, mbti: { Ti: 3, Ni: 2 }, ennea: { 5: 3, 1: 1 } } 
            },
            { 
                text: "自分の中に渦巻く『唯一無二の感情や世界観』を、形にして外に出すこと。", 
                scores: { socio: { Fi: 5, Fe: 2 }, mbti: { Fi: 3}, ennea: { 4: 3 } } 
            },
            { 
                text: "技術的な完成度を高めること、またはそれが誰かの『役に立つ・実用的である』こと。", 
                scores: { socio: { Te: 3, Si: 1 }, mbti: { Te: 3, Se: 1 }, ennea: { 3: 2, 1: 2 } } 
            },
            { 
                text: "見た人が「面白い！」「凄い！」と楽しんでくれて、ポジティブな評価（反応）をもらえること。", 
                scores: { socio: { Fe: 2, Se: 2 }, mbti: { Fe: 2, E: 2 }, ennea: { 2: 2, 3: 2, 7: 1 } } 
            }
        ]
    },
    {
        id: "q_copycat_hate", // ★チャッピー提案：他人と同じものを作る抵抗感
        type: "radio",
        text: "「他人と同じようなもの（ありきたりな意見や作品）」を作ることへの抵抗感は？",
        options:[
            { 
                text: "絶対嫌。完全にオリジナルの自己表現（または独自の視点）でなければ意味がない。", 
                scores: { socio: { Fi: 2, Ne: 2 }, mbti: { Fi: 2, Ne: 2 }, ennea: { 4: 3 } } 
            },
            { 
                text: "かなり嫌。自分なりの「新しい可能性」や「論理的な差異（バグ）」を必ず組み込みたい。", 
                scores: { socio: { Ti: 2, Ne: 2 }, mbti: { Ti: 2, Ne: 2 }, ennea: { 5: 2, 7: 1 } } 
            },
            { 
                text: "少し嫌だが、求められている役割や流行があるなら、ある程度は合わせる。", 
                scores: { socio: { Fe: 2 }, mbti: { Fe: 2 }, ennea: { 3: 2, 9: 1 } } 
            },
            { 
                text: "気にならない。既存のフォーマットで実用性や効率が担保されるなら、むしろその方が良い。", 
                scores: { socio: { Te: 2, Si: 2 }, mbti: { Te: 2, Si: 2 }, ennea: { 9: 2, 1: 1 } } 
            }
        ]
    },
    {
        id: "q_information_processing", // ★チャッピー提案：新情報の処理優先度
        type: "radio",
        text: "「全く新しい知識や未知のトラブル」に直面した時、あなたの脳が『最初に』動く方向は？",
        options:[
            { 
                text: "「なぜそうなるのか？」と、前提条件や裏にある『構造・原因』を解体して分析する。", 
                scores: { socio: { Ti: 3, Ni: 1 }, mbti: { Ti: 3, Ni: 1 }, ennea: { 5: 3 } } 
            },
            { 
                text: "「これをあっちに組み合わせたらどうなる？」と、『別の可能性やアイデア』が次々と連想される。", 
                scores: { socio: { Ne: 3, Ni: -3 }, mbti: { Ne: 3, Ni: -3 }, ennea: { 7: 3 } } 
            },
            { 
                text: "「で、これをどう使えば解決できるの？」と、『実用性と具体的な行動』を即座に計算する。", 
                scores: { socio: { Te: 3, Se: 1 }, mbti: { Te: 3, Se: 1 }, ennea: { 8: 2, 3: 1 } } 
            },
            { 
                text: "「みんなはどう感じているだろうか？」と、周囲の『人の気持ちや空気への影響』を察知する。", 
                scores: { socio: { Fe: 6, Fi: 6 }, mbti: { Fe: 3, Fi: 3 }, ennea: { 2: 2, 9: 2 } } 
            }
        ]
    },
    {
        id: "q_avoid_competition", // ★みつきの神エピソード「競争回避のNi」
        type: "radio",
        text: "「他人と競争したくない」「荒波を立てたくない」とあなたが思う時、その『本当の理由』に一番近いのは？",
        options:[
            { 
                text: "競うために時間や労力を使い、無理をして、最終的に自分のシステムやメンタルが崩壊する『未来の負担』が見えていてコスパが悪いから。", 
                scores: { socio: { Ni: 3, Ti: 2, Se: -2 }, mbti: { Ni: 3, Ti: 1 }, ennea: { 5: 3, 9: 1 } } // みつきのNi-Tiによる競争拒否！
            },
            { 
                text: "争うこと自体が、全体の平和や人間関係の調和を乱し、誰かが傷つくのが嫌だから。", 
                scores: { socio: { Fe: 5, Fi: 4, Si: 3 }, mbti: { Fi: 3, Fe: 3, Si: 1 }, ennea: { 9: 3, 2: 1 } } 
            },
            { 
                text: "他人のペースに巻き込まれず、自分の大切な価値観や内なる平穏を守り抜きたいから。", 
                scores: { socio: { Fi: 5 }, mbti: { Fi: 3 }, ennea: { 4: 2, 9: 2 } } 
            },
            { 
                text: "競争したくないとは思わない。むしろ勝って自分の実力を証明したい。", 
                scores: { socio: { Se: 3, Te: 2 }, mbti: { Se: 2, Te: 3 }, ennea: { 8: 3, 3: 2 } } // 覇王枠
            }
        ]
    },
    {
        id: "q_lii_subtype_3", // ★Ne質問＆LIIサブタイプ第3弾！
        type: "radio",
        text: "もしあなたが『全く新しい街』を一から作れるとしたら、どこに一番こだわる？",
        options:[
            { 
                text: "【究極のシステム】交通網や法律など、すべてが矛盾なく完璧に機能する『論理的に美しい構造』。", 
                scores: { socio: { Ti: 4 }, mbti: { Ti: 3, J: 1 }, ennea: { 5: 3, 1: 2 } } 
            },
            { 
                text: "【可能性のるつぼ】変な建物やルールがあっても許される、毎日が発見と実験に満ちた『カオスで自由な空間』。", 
                scores: { socio: { Ne: 4, Ni: -3 }, mbti: { Ne: 3, Ni: -3 }, ennea: { 7: 3 } } // Ne爆上がり！
            },
            { 
                text: "【絶対の安全網】将来の災害や人口増減などのリスクを事前に全て計算し尽くし、破綻を回避する『要塞』。", 
                scores: { socio: { Ni: 4, Ti: 1 }, mbti: { Ni: 3, J: 2 }, ennea: { 5: 2, 6: 3 } } // みつきのLII-Ni！
            },
            { 
                text: "街作りとか興味ない。わからない。（または、今の自分の部屋が快適ならそれでいい）", 
                scores: { socio: { Si: 2 }, mbti: { Se: 2, Si: 1 }, ennea: { 9: 3 } } // スルー枠（Si）
            }
        ]
    },
    {
        id: "q_socio_si_vs_mbti_si", // ★ソシオのSi(美意識・快適)とMBTIのSi(記憶・過去)を分断する神問題！
        type: "radio",
        text: "あなたにとって『心地よい空間・良い環境』を構成する一番の要素は？",
        options:[
            { 
                text: "視覚的な美しさ、肌触りの良いインテリア、適温など、現在の『五感の調和と物理的な快適さ』。", 
                scores: { socio: { Si: 5 }, mbti: { Se: 4, Si: 1 }, ennea: { 9: 2, 4: 1 } } // ★ソシオSi主導（SEI等）、MBTIではSe（ISFP等）に換算！
            },
            { 
                text: "昔から使っている馴染みの家具や、変わらない『いつものルーティン（伝統）』が保たれていること。", 
                scores: { socio: { Si: 1, Fi: 1 }, mbti: { Si: 4 }, ennea: { 6: 3, 9: 1 } } // ★MBTIのSi（ISFJ等）
            },
            { 
                text: "余計な装飾が一切なく、無駄を削ぎ落として『思考や作業に100%集中できる』合理的な空間。", 
                scores: { socio: { Ti: 3, Ni: 1 }, mbti: { Ni: 2, Ti: 2 }, ennea: { 5: 3, 1: 1 } } // INTJ/INTPのノイズレス空間
            },
            { 
                text: "最新の設備や高級なものが揃っており、自分の力や『ステータス』を感じられる空間。", 
                scores: { socio: { Se: 3, Te: 1 }, mbti: { Se: 2, Te: 2 }, ennea: { 3: 3, 8: 2 } } // 覇王枠（Se-Te）
            }
        ]
    },
    {
        id: "q_ne_divergence", // ★Ne爆上がり質問！
        type: "radio",
        text: "【連想テスト】「りんご」という単語から、1分間でどこまで思考を広げられる？",
        options:[
            { 
                text: "「りんご→赤→太陽→宇宙…」と、全く無関係な概念へ際限なく飛躍し、分岐・拡散していく。", 
                scores: { socio: { Ne: 4, Ni: -3 }, mbti: { Ne: 4, Ni: -3 }, ennea: { 7: 4 } } // Ne爆上がり！
            },
            { 
                text: "「りんごの品種、歴史、栄養素、市場価値」など、その対象そのものを深く掘り下げて情報を整理する。", 
                scores: { socio: { Ti: 2, Te: 2 }, mbti: { Ti: 2, Te: 2 }, ennea: { 5: 3 } } 
            },
            { 
                text: "「りんごと言えば、あの時食べたアップルパイが美味しかったな」という個人的な記憶や情景を思い出す。", 
                scores: { socio: { Si: 3, Fi: 1 }, mbti: { Si: 3, Fi: 1 }, ennea: { 9: 2, 4: 1 } } 
            },
            { 
                text: "「万有引力」「禁断の果実」「死と再生のメタファー」など、一つの象徴的な『意味・結末』に収束させる。", 
                scores: { socio: { Ni: 3 }, mbti: { Ni: 3 }, ennea: { 4: 2, 5: 1 } } // Niの象徴化
            }
        ]
    },
    {
        id: "q_lii_subtype_2", // ★LIIサブタイプ判別 第2弾！
        type: "radio",
        text: "【難問へのアプローチ】「絶対に解けないとされている謎や問題」に出会った時、あなたの脳内はどう動く？",
        options:[
            { 
                text: "【法則の洗練】全ての変数を洗い出し、論理の矛盾を一つずつ潰して『完璧な証明』を組み上げたくなる。", 
                scores: { socio: { Ti: 4 }, mbti: { Ti: 3 }, ennea: { 5: 3, 1: 1 } } 
            },
            { 
                text: "【可能性の拡散】既存のアプローチを捨てて、誰も思いつかないような『奇想天外な仮説』を大量に生み出して遊ぶ。", 
                scores: { socio: { Ne: 4, Ni: -3 }, mbti: { Ne: 3, Ni: -3 }, ennea: { 7: 3, 5: 1 } } 
            },
            { 
                text: "【圧の回避・直列検証】それが解けなかった場合の『最悪のシナリオ（自分への影響）』を予測し、回避ルートや代替案を確保する。", 
                scores: { socio: { Ni: 4, Ti: 2 }, mbti: { Ni: 3, Ti: 2 }, ennea: { 5: 3, 6: 2 } } // みつきのLII-Ni！
            },
            { 
                text: "【合理・実行】解けないなら時間の無駄。現実的に解ける課題にリソースを回すか、力技で突破する。", 
                scores: { socio: { Te: 3, Se: 2 }, mbti: { Te: 3, Se: 2 }, ennea: { 8: 2, 3: 1 } } 
            }
        ]
    },
    {
        id: "q_meta_hacking", // ★態度の裏を見抜く超メタ質問！
        type: "radio",
        text: "【メタ観測】今、この診断テストを受けながら、内心どんなモチベーションで選択肢を選んでいる？",
        options:[
            { 
                text: "「『この選択肢を選ぶと、裏でどの機能（TiとかNi）に加点されるか』というシステムの構造を推測・解体しながら遊んでいる」", 
                scores: { socio: { Ti: 3, Ne: 2 }, mbti: { Ti: 3, Ne: 1 }, ennea: { 5: 3 } } // 診断ハッカー（T型）
            },
            { 
                text: "「『これが私だ！』と、自分の内面と向き合う純粋な自己探求を楽しんでいる」", 
                scores: { socio: { Fi: 3 }, mbti: { Fi: 3 }, ennea: { 4: 3 } } // 純F型（Fi）
            },
            { 
                text: "「早く結果（自分のタイプ）が出ないかな、と効率と最終的な判定だけを求めている」", 
                scores: { socio: { Te: 3 }, mbti: { Te: 3 }, ennea: { 3: 3 } } // Te型
            },
            { 
                text: "「自分が望むタイプ（あるいはカッコいい・理想の自分）が出るように、無意識に自分を演出して選んでいる」", 
                scores: { socio: { Ni: 2, Fe: 2 }, mbti: { Ni: 2, Fe: 2 }, ennea: { 3: 2, 4: 1 } } // Ni-Feのペルソナ（INFJ等）
            }
        ]
    },
    {
        id: "q_logical_words", 
        type: "radio",
        text: "「エントロピー」「合理的」「パラダイムシフト」などの小難しい論理語やビジネス用語、普段の会話で気軽に使う？",
        options:[
            { 
                text: "気軽には使えない。「今の文脈でその言葉を使うのが本当に正しいか？定義は合っているか？」と考えてしまうから。", 
                scores: { socio: { Ti: 3 }, mbti: { Ti: 3, Ni: 1 }, ennea: { 5: 3, 1: 2 } } 
            },
            { 
                text: "便利だし、手っ取り早く情報が伝わる（または相手を説得できる）からツールとして積極的に使う。", 
                scores: { socio: { Te: 3 }, mbti: { Te: 3 }, ennea: { 3: 2, 8: 1 } } 
            },
            { 
                text: "なんか賢そうに見えるし、場のノリに合わせて「それな〜合理的〜」とか適当に使っちゃう。", 
                scores: { socio: { Fe: 2 }, mbti: { Fe: 2, Se: 1 }, ennea: { 3: 1, 7: 2 } } 
            },
            { 
                text: "使わない。自分の本当の気持ちや、自分の言葉（自分の表現）で伝えたいから。", 
                scores: { socio: { Fi: 3 }, mbti: { Fi: 3 }, ennea: { 4: 3 } } 
            }
        ]
    },
    {
        id: "q_future_anxiety",
        type: "radio",
        text: "「次に何が起こるか予測できない状況」は不安ですか？",
        options:[
            { 
                text: "はい、すごく不安で嫌だ。", 
                scores: { socio: { Ni: 2, Ti: 2 }, mbti: { Ni: 3, Ti: 1 }, ennea: { 6: 1 } }, 
                followUp: {
                    id: "q_future_followup",
                    type: "radio",
                    text: "👁️ [System: 思考の深掘り] ほんとに？ その不安の『本当の理由』はどっち？",
                    options:[
                        { text: "純粋に、未知の事態や自分のコントロール外になること自体が怖いから。", scores: { socio: { Ni: 3 }, mbti: { Ni: 3 }, ennea: { 6: 2 } } },
                        { text: "予定通りに進まないと落ち着かない。", scores: { socio: {}, mbti: { Si: 3 }, ennea: { 6: 2 } } },
                        { text: "予想外の質問や事態が来た時に『正確に答えられない・間違えた対応をしたくない』から。", scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ti: 3, Ni: 2 }, ennea: { 5: 2, 1: 2 } } } // ★ソシオNe、MBTI Niで分離！
                    ]
                }
            },
            { text: "いいえ、むしろアドリブでどうにかなる。", scores: { socio: { Se: 2 }, mbti: { Se: 2, Ne: 1 }, ennea: { 7: 2, 8: 1 } } } 
        ]
    },
    {
        id: "q_sli_comfort_realism",
        type: "radio",
        text: "新しいツールやアプリを導入するとき、あなたの頭の中は？",
        options: [
            {
                text: "『これ使ったら日常がどれだけ楽になるか？』『今のルーティンが崩れないか？』『身体的に疲れないか？』をまず考える。実用的で快適なら即採用。",
                scores: { socio: { Si: 4, Te: 3 }, mbti: { Si: 3, Te: 2 }, ennea: { 9: 3, 6: 1 } } // SLIのSi-Te爆上がり！ISTPの現実的快適重視
            },
            {
                text: "『このツールの論理構造は正しいか？』『どんな可能性やバグがあるか？』を分解して検証したくなる。実用性よりシステムの美しさが気になる。",
                scores: { socio: { Ti: 4, Ne: 2 }, mbti: { Ti: 3, Ne: 2 }, ennea: { 5: 3 } } // LII寄り
            },
            {
                text: "『これで将来どう変わるか？』『最悪のシナリオは？』と未来の連鎖を予測して、圧を感じたら回避ルートを探す。",
                scores: { socio: { Ni: 3, Ti: 1 }, mbti: { Ni: 3 }, ennea: { 5: 2, 6: 2 } } // LII-Ni寄り
            },
            {
                text: "面白そうならすぐ試す。合わなかったら捨てるだけ。",
                scores: { socio: { Se: 2, Ne: 1 }, mbti: { Se: 2, Ne: 1 }, ennea: { 7: 2 } }
            }
        ]
    },
    {
        id: "q_sli_se_pressure_avoid",
        type: "radio",
        text: "急に『今すぐこれやれ！』って強い圧かけられた時、どうなる？",
        options: [
            {
                text: "イラッとするけど、『面倒くせえ…でも今やっとけば後で楽だろ』と現実的に判断してサクッと片付ける。身体的に疲れない範囲で済ます。",
                scores: { socio: { Si: 3, Te: 3, Se: -1 }, mbti: { Se: 2, Ti: 2 }, ennea: { 9: 2, 6: 1 } } // SLIの現実的回避！ISTPの「今動いて終わらせ」
            },
            {
                text: "圧が強すぎて思考停止。『どうせこうなるなら…』と未来の悪展開が見えて完全に逃げ腰になる。",
                scores: { socio: { Ni: 3, Ti: 2, Se: -3 }, mbti: { Ni: 3, Ti: 2 }, ennea: { 5: 3 } } // LII-NiのSe PoLR強調
            },
            {
                text: "圧かけられても『お前がそうしたいなら勝手にしろ』とスルー。自分のペース崩さない。",
                scores: { socio: { Fi: 2, Se: 1 }, mbti: { Fi: 1, Se: 2 }, ennea: { 9: 2 } }
            },
            {
                text: "逆に押し返して自分のペースに持っていく。圧は気にならない。",
                scores: { socio: { Se: 4 }, mbti: { Se: 3 }, ennea: { 8: 3 } }
            }
        ]
    },
    {
        id: "q_sli_routine_efficiency",
        type: "radio",
        text: "毎日の生活で一番大事にしてるのは？",
        options: [
            {
                text: "決まったルーティンで無駄なく過ごすこと。身体が楽で、効率よく回る環境を維持するのが最高。",
                scores: { socio: { Si: 5, Te: 3 }, mbti: { Si: 4, Se: 3, Te: 2 }, ennea: { 9: 3, 1: 1 } } // SLIのSi-Te王道！ISTPの快適ルーティン
            },
            {
                text: "新しいアイデアや論理の穴を探して埋めること。毎日同じだと退屈で死ぬ。",
                scores: { socio: { Ne: 3, Ti: 3 }, mbti: { Ne: 3, Ti: 3 }, ennea: { 7: 2, 5: 2 } } // LII-Ne寄り
            },
            {
                text: "未来のリスクを先読みして、備えを固めておくこと。",
                scores: { socio: { Ni: 3, Te: 2 }, mbti: { Ni: 3 }, ennea: { 5: 3, 6: 2 } } // LII-Ni寄り
            },
            {
                text: "人と関わって刺激をもらうこと。ルーティンより変化が大事。",
                scores: { socio: { Fe: 5, Se: 5 }, mbti: { Fe: 1, Se: 2 }, ennea: { 7: 2 } }
            }
        ]
    },
    {
        id: "q_ne_brainstorm_trap",
        type: "radio",
        text: "新しいアイデアを出すブレスト会議で、あなたの頭の中は？",
        options: [
            {
                text: "次々と思いつきが連鎖！『これをあっちに組み合わせたら？』『逆張りしたら面白いかも！』と可能性が無限に枝分かれして止まらない。",
                scores: { socio: { Ne: 5 }, mbti: { Ne: 4, P: 2 }, ennea: { 7: 4 } } // Ne爆上げ！LII-NeやILE寄り
            },
            {
                text: "アイデアは出るけど、すぐに『これの結末はどうなる？』『本当に実現可能か？』と一本道の未来予測に収束させる。",
                scores: { socio: { Ni: 4, Ti: 1 }, mbti: { Ni: 3 }, ennea: { 5: 3 } } // ILI/INTJ寄り
            },
            {
                text: "みんなの感情や場のノリを読みながら、『これでみんな盛り上がるかな？』と調整しながら出す。",
                scores: { socio: { Fe: 5, Ne: 1 }, mbti: { Fe: 3, Ne: 2 }, ennea: { 2: 2, 7: 1 } }
            },
            {
                text: "実用的か・効率的かをまず考えて、無駄な枝分かれは避ける。",
                scores: { socio: { Te: 3 }, mbti: { Te: 3 }, ennea: { 3: 2, 8: 1 } }
            }
        ]
    },
    {
        id: "q_vulnerable_se_fe",
        type: "radio",
        text: "突然『今すぐ決めて！』と強い圧をかけられたり、『もっとテンション上げて楽しもうよ！』と感情を強要された時、あなたの内心は？",
        options: [
            {
                text: "圧が強すぎて思考停止。逃げ出したくなるし、後で消耗しまくる。",
                scores: { socio: { Se: -4, Ti: 2, Ni: 1 }, mbti: { Se: -3, Ni: 2 }, ennea: { 5: 3, 9: 2 } } // LII-NiのSe PoLR強調
            },
            {
                text: "感情強要が無理。『楽しめって言われても無理』とシャットダウン。",
                scores: { socio: { Fe: -4, Ni: 2, Ti: 1 }, mbti: { Fe: -3, Ni: 3 }, ennea: { 5: 3 } } // ILIやLIIのFeマイナス
            },
            {
                text: "圧は嫌だけど、なんとか対応して場を収める。",
                scores: { socio: { Fe: 2, Ti: -1 }, mbti: { Fe: 2 }, ennea: { 9: 2, 6: 1 } }
            },
            {
                text: "圧かけられても動じない。逆に押し返して自分のペースに持っていく。",
                scores: { socio: { Se: 4 }, mbti: { Se: 3 }, ennea: { 8: 3 } }
            }
        ]
    },
    {
        id: "q_inf_j_eii_rescue",
        type: "radio",
        text: "誰かが悩んでるのを見て、あなたの心が一番動くのは？",
        options: [
            {
                text: "その人の『本当の価値観や内なる可能性』が潰されそうで悲しい。どうすればその人が自分らしく輝けるか、静かに考えたくなる。（個別の道徳・成長ビジョン）",
                scores: { socio: { Fi: 4, Ne: 3 }, mbti: { Fi: 3, Ne: 2 }, ennea: { 4: 3, 1: 2 } } // EIIのFi-Ne救済！INFJの内省的理想主義に刺さる
            },
            {
                text: "その人の感情が伝わってきて、一緒に沈むor『この空気をどうポジティブな流れに変えよう？』と先読みして導きたくなる。（感情の波・物語操作）",
                scores: { socio: { Fe: 4, Ni: 3 }, mbti: { Fe: 3, Ni: 3 }, ennea: { 2: 3, 4: 1 } }, // IEI寄りだけどfollow-upで炙り出し
                followUp: {
                    id: "q_inf_j_eii_followup",
                    type: "radio",
                    text: "👁️ [System: 思考の深掘り] その『導きたい』気持ちの本質はどっち？",
                    options: [
                        { text: "本当にその人の内面や価値観を尊重して、独自の道を歩めるよう支えたい。みんなが同じじゃなくていい。", scores: { socio: { Fi: 6, Ne: 2, Fe: -1 }, mbti: { Fi: 3, Ne: 2, Fe: -1 }, ennea: { 4: 3, 9: 2 } } }, // 本物のEII寄り修正！
                        { text: "みんなが心地よい雰囲気・前向きなストーリーになるよう、感情の流れを調整するのが心地いいor正しい対応だと思う。", scores: { socio: { Fe: 4, Ni: 2 }, mbti: { Fe: 3, Ni: 2 }, ennea: { 2: 3 } } }, // IEIの本物
                        { text: "実は『ここで優しく振る舞うのが社会的に正解』と思って出力してるだけかも。本心では距離置きたい。", scores: { socio: { Ti: 3, Fe: -3, Fi: -2 }, mbti: { Ti: 3, Fe: -2 }, ennea: { 5: 3, 1: 2 } } } // T擬態炙り出し！INFJ誤診防止
                    ]
                }
            },
            {
                text: "悩みの原因を論理的に分解して、『これが構造的な問題ならこう解決』と提案したくなる。",
                scores: { socio: { Ti: 3, Ni: 1 }, mbti: { Ti: 2, Ni: 2 }, ennea: { 5: 3 } }
            },
            {
                text: "相手のペースに任せて、ただそばにいるor実務的にサポートする。",
                scores: { socio: { Si: 2, Fi: 1 }, mbti: { Si: 2, Fi: 1 }, ennea: { 9: 2 } }
            }
        ]
    },
    {
        id: "q_isfj_esi_rescue",
        type: "radio",
        text: "大切な人が誰かに傷つけられたor不当に扱われた時、あなたの反応は？",
        options: [
            {
                text: "『絶対に許せない！』その人の尊厳や正しさが踏みにじられたのが生理的に嫌。相手に直接立ち向かって守りたいor距離を取らせる。（個別道徳・現実的防衛）",
                scores: { socio: { Fi: 4, Se: 3 }, mbti: { Fi: 3, Se: 1 }, ennea: { 1: 2, 6: 2 } } // ESIのFi-Se救済！ISFJのGuardian忠誠心に刺さる
            },
            {
                text: "空気が悪くなってみんなが辛そう…。穏やかに仲裁して、みんなが心地よく戻れるよう調整したくなる。（調和・快適優先）",
                scores: { socio: { Fe: 4, Si: 3 }, mbti: { Fe: 3, Si: 3 }, ennea: { 9: 3, 2: 1 } }, // SEI寄りだけどfollow-upで区別
                followUp: {
                    id: "q_isfj_esi_followup",
                    type: "radio",
                    text: "👁️ [System: 思考の深掘り] その『調整したい』はどっち寄り？",
                    options: [
                        { text: "みんなの調和より、被害を受けた人の『正しさ・尊厳』が一番大事。譲れないラインがある。", scores: { socio: { Fi: 4, Se: 2, Fe: -1 }, mbti: { Fi: 3, Se: 1, Fe: -1 }, ennea: { 1: 3, 6: 2 } } }, // ESI寄り修正！
                        { text: "全体の平和と心地よさが優先。感情の波を穏やかに戻すのが大事。", scores: { socio: { Fe: 4, Si: 2 }, mbti: { Fe: 3, Si: 2 }, ennea: { 9: 3 } } }, // SEIの本物
                        { text: "実は『ここで正義の味方ぶるのが自分的に正解』と思って動いてるだけかも。", scores: { socio: { Ti: 2, Fi: -2 }, mbti: { Ti: 2 }, ennea: { 1: 2, 5: 1 } } } // T擬態防止
                    ]
                }
            },
            {
                text: "冷静に事実を整理して、『これ以上被害が出ないよう』現実的に対処する。",
                scores: { socio: { Te: 2, Si: 1 }, mbti: { Te: 1, Si: 2 }, ennea: { 6: 2 } }
            },
            {
                text: "感情的に巻き込まれず、距離を取って見守る。",
                scores: { socio: { Ni: 2, Fi: 1 }, mbti: { Ni: 1, Fi: 1 }, ennea: { 9: 2 } }
            }
        ]
    },
    {
        id: "q_understanding_meaningless",
        type: "radio",
        text: "「他人の行動（推し活、旅行、すぐ終わる恋愛など）が理解不能だ」と思った時、あなたの脳内はどうなる？",
        options:[
            { 
                text: "「理解不能だ、無駄だ」と言いながらも、『なぜ彼らはそんな無駄なことをするのか？』『コストに見合っているのか？』と永遠に理由を反芻・分析してしまう。", 
                scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ni: 3, Ti: 2 }, ennea: { 5: 3, 6: 1 } } // ★ソシオNe、MBTI Niで分離！
            },
            { 
                text: "「自分には関係ないし、無駄だ」と瞬時に切り捨てて、それ以上一切考えないし興味も持たない。", 
                scores: { socio: { Te: 3, Ni: 2 }, mbti: { Te: 3, Ni: 2 }, ennea: { 5: 2, 8: 1 } } 
            },
            { 
                text: "理解できなくても、「まあ人が楽しんでるならいいんじゃない？」と適当に同調するか放っておく。", 
                scores: { socio: { Fe: 2, Si: 1 }, mbti: { Fe: 2, Si: 2 }, ennea: { 9: 3 } } 
            },
            { 
                text: "「理解不能だからこそ、自分も一度体験して確かめてみよう」と首を突っ込む。", 
                scores: { socio: { Se: 2, Ne: 2 }, mbti: { Se: 2, Ne: 2 }, ennea: { 7: 3 } } 
            }
        ]
    },
    {
        id: "q_empathy_t_fixed", 
        type: "radio",
        text: "友人が「最近仕事でミスばっかりで辛い…」と落ち込んでいます。あなたが『共感・慰め』のつもりでかけがちな言葉は？",
        options:[
            { 
                text: "「わかるよ……失敗自体より、再現性がないことへの不安が原因だと思う。ミスを要因分解すると——」", 
                scores: { socio: { Ti: 3 }, mbti: { Ti: 3, Te: 1 }, ennea: { 5: 2, 1: 1 } } 
            },
            { 
                text: "「それは辛かったね。わかるよ、私もこの前同じようなことあってさ…」", 
                scores: { socio: { Fe: 2, Fi: 1 }, mbti: { Fe: 2, Fi: 1 }, ennea: { 2: 2, 9: 1 } },
                followUp: {
                    id: "q_empathy_followup",
                    type: "radio",
                    text: "👁️ [System: 思考の深掘り] ほんとに？ その『共感』、自然にできてる？ 心の中でどう思ってる？",
                    options:[
                        { text: "はい。相手の悲しみがそのまま流れ込んできて、心から感情が同期する。（純F型）", scores: { socio: { Fe: 7, Fi: 5 }, mbti: { Fe: 3, Fi: 2, Ti: -2 }, ennea: { 2: 3, 4: 1 } } }, 
                        { text: "いや、実は『ここでこう言うのが社会的な正解（マナー）だろう』と計算して出力してるだけ。本心では冷めているし、リアクションも薄い。", scores: { socio: { Ti: 3, Fe: -2 }, mbti: { Ti: 3, Fe: -2 }, ennea: { 5: 2, 3: 1 } } } 
                    ]
                }
            },
            { 
                text: "「そのミスのせいで、実務的にどんな被害が出てる？ カバーできるか考えるよ」", 
                scores: { socio: { Te: 3 }, mbti: { Te: 3 }, ennea: { 8: 1, 3: 1 } } 
            },
            { 
                text: "……（何も言わず、ただ隣にいて話を聞く）", 
                scores: { socio: { Fi: 2, Si: 1 }, mbti: { Fi: 2, Si: 2 }, ennea: { 9: 2 } },
                followUp: {
                    id: "q_empathy_silent_followup",
                    type: "radio",
                    text: "👁️[System: 思考の深掘り] 黙って話を聞いている時、あなたの内心（リアクション）は？",
                    options:[
                        { text: "相手の痛みを自分事のように感じ、言葉にならない深い悲しみ（共感）で寄り添っている。", scores: { socio: { Fi: 3, Fe: 1 }, mbti: { Fi: 3 }, ennea: { 4: 2, 9: 2 } } }, 
                        { text: "話は聞いているが、大した共感はできていない。どうリアクションしていいかわからず、とりあえず棒読みで相槌を打っている。", scores: { socio: { Ti: 3, Fe: -2, Fi: -2 }, mbti: { Ti: 3, Fi: -2 }, ennea: { 5: 3, 9: 1 } } } 
                    ]
                }
            }
        ]
    },
    {
        id: "q_future_resolution", 
        type: "radio",
        text: "あなたが「未来」について考える時、脳内の焦点（解像度）はどこに向きがちですか？",
        options:[
            { 
                text: "【遠い未来】「世界情勢」や「数年後の社会の結末」など、大局的でマクロな未来をシニカルに見つめる。", 
                scores: { socio: { Ni: 3, Te: 1 }, mbti: { Ni: 3 }, ennea: { 5: 2, 8: 1 } } 
            },
            { 
                text: "【近い未来】「今日の1日の流れ」や「これから会う人との対人リスク」をシミュレーションして、起きてもいないのに勝手に消耗する。", 
                scores: { socio: { Ti: 2, Ne: 1, Ni: 1 }, mbti: { Ni: 2, Ti: 2 }, ennea: { 5: 3, 6: 2 } } // ★ソシオNe/Ti、MBTI Niで分離！
            },
            { 
                text: "【今この瞬間】未来のことなんてわからない。今、目の前にある現実や刺激にどう対応するかがすべて。", 
                scores: { socio: { Se: 3 }, mbti: { Se: 3 }, ennea: { 7: 3, 8: 1 } } 
            },
            { 
                text: "【過去との比較】未来よりも、過去の経験や蓄積されたデータをもとに「いつも通り」の安定を維持したい。", 
                scores: { socio: { Si: 1, Ti: 2 }, mbti: { Si: 3 }, ennea: { 6: 2, 9: 2 } } // ★ソシオのSiは快適さなので、過去比較はMBTIのSi特化に！
            }
        ]
    },
    {
        id: "q_word_habits", 
        type: "checkbox",
        text: "あなたの脳内でよく巡る言葉（思考のクセ）をすべて選んでください。（複数選択可）",
        options:[
            { text: "「どうせそうなる」「人は変わらない」「関わるだけ無駄」", scores: { socio: { Te: 2, Ni: 1 }, mbti: { Te: 2, Ni: 1 }, ennea: { 5: 1 } },
              followUp: {
                  id: "q_word_habits_followup",
                  type: "radio",
                  text: "👁️ [System: 思考の深掘り] 「関わるだけ無駄、最初から諦めてる」……ほんとに？ 1%でも諦めきれてないところ、あるんじゃない？",
                  options:[
                      { text: "本当にない。100%損切り済みの完全な虚無・諦観である。", scores: { socio: { Te: 3, Ni: 2 }, mbti: { Te: 3, Ni: 2 }, ennea: { 5: 2 } } }, 
                      { text: "……実は「どうすれば正解だったのか」と納得できない部分があり、心の中で永遠に考え直している（諦めきれていない）。", scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ti: 3, Ni: 2 }, ennea: { 5: 3, 6: 2 } } } 
                  ]
              }
            },
            { text: "「納得できない」「分からないのが気持ち悪い」「正しい形があるはず」", scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ti: 3, Ni: 1 }, ennea: { 5: 2, 1: 2 } } }, 
            { text: "「私が我慢すれば」「みんなが笑ってくれるなら」「どう思われてるかな」", scores: { socio: { Fe: 3 }, mbti: { Fe: 3 }, ennea: { 2: 2, 9: 2 } } },
            { text: "「とりあえずやってみよう」「何とかなるっしょ」「縛られたくない」", scores: { socio: { Se: 2, Ne: 1 }, mbti: { Se: 2, Ne: 2 }, ennea: { 7: 2, 8: 1 } } }
        ]
    },
    {
        id: "q_communication_softness", 
        type: "radio",
        text: "自分の意見を人に伝える時、またはネット等でコメントする時の「文章のトーン」は？",
        options:[
            { 
                text: "「これはこうだ」と事実や結論を断定的に、シニカルで冷たく言い切る。", 
                scores: { socio: { Te: 3, Ni: 1 }, mbti: { Te: 3, Ni: 1 }, ennea: { 8: 2, 5: 1 } } 
            },
            { 
                text: "「推測ですが」「〜かもしれません」「という可能性もありますね」と、余白を残した柔らかい言い回しになる。", 
                scores: { socio: { Ti: 3, Ne: 2 }, mbti: { Ti: 2, Ni: 2 }, ennea: { 5: 2, 9: 1 } } // ★ソシオNe、MBTI Niで分離！
            },
            { 
                text: "相手の感情に寄り添い、絵文字や感嘆符を多く使って、温かみや共感を全面に出す。", 
                scores: { socio: { Fe: 3 }, mbti: { Fe: 3 }, ennea: { 2: 3 } } 
            },
            { 
                text: "無駄な装飾は一切せず、箇条書きや事務的な連絡のみで済ませる。", 
                scores: { socio: { Si: 2, Te: 2 }, mbti: { Si: 2, Te: 2 }, ennea: { 1: 2, 6: 1 } } 
            }
        ]
    },
    {
        id: "q_silence_fixed", 
        type: "radio",
        text: "会話中に「ふと沈黙（無言の時間が流れること）」が起きた時、どう感じる？",
        options:[
            { 
                text: "気まずい！「何か話して場を繋がなきゃ」と焦り、無理に話題を振る。", 
                scores: { socio: { Fe: 3 }, mbti: { Fe: 3 }, ennea: { 2: 2, 6: 1 } } 
            },
            { 
                text: "何とも思わない。自分の頭の中で情報を処理しているか、別のことを考えているので沈黙がデフォルト。", 
                scores: { socio: { Ti: 3, Ni: 1 }, mbti: { Ti: 2, Ni: 2 }, ennea: { 5: 3, 9: 1 } } 
            },
            { 
                text: "沈黙の間に「この人は今何を考えているのか？」と、相手の意図や腹の中を観察・深読みする。", 
                scores: { socio: { Ni: 2, Fi: 1 }, mbti: { Ni: 3 }, ennea: { 4: 2, 5: 1 } },
                followUp: {
                    id: "q_silence_followup",
                    type: "radio",
                    text: "👁️ [System: 思考の深掘り] ほんとに深読みできてる？ その沈黙空間、本音ではどう思ってる？",
                    options:[
                        { text: "相手の感情や「言いたいけど言えないこと」が手に取るようにわかる（または直感で察する）。", scores: { socio: { Ni: 2, Fe: 2, Fi: 2 }, mbti: { Ni: 2, Fe: 2 }, ennea: { 4: 2, 2: 1 } } }, 
                        { text: "考えても結局よくわからない（意味不明）。データ不足で処理落ちし、ただただ『居心地が悪い・早く帰りたい』となる。", scores: { socio: { Ti: 3, Fe: -3 }, mbti: { Ti: 3, Fe: -2 }, ennea: { 5: 2, 9: 1 } } } 
                    ]
                }
            },
            { 
                text: "「話すことがないなら解散でよくない？」と、無駄な時間を切り上げようとする。", 
                scores: { socio: { Te: 3 }, mbti: { Te: 3 }, ennea: { 8: 2, 3: 1 } } 
            }
        ]
    },
    {
        id: "q_entj_father", 
        type: "radio",
        text: "他人が「非効率なこと」「言い訳」「感情的な理想論」を語っているのを聞いた時、内心どう思う？",
        options:[
            { 
                text: "「何言ってんだコイツ」と見下し、結果や事実（あるいは実力・権力）だけでバッサリ論破・ねじ伏せたくなる。", 
                scores: { socio: { Se: 3, Te: 2 }, mbti: { Te: 3, Se: 1 }, ennea: { 8: 3, 3: 1 } } // ★ソシオSe主導(SLE)、MBTI Te主導(ENTJ)で分離！！
            },
            { 
                text: "「定義や前提条件が間違っている」と心の中で論理のバグ（矛盾）を指摘するが、通じないならスルーする。", 
                scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ti: 3, Ni: 1 }, ennea: { 5: 3, 1: 1 } } 
            },
            { 
                text: "「なぜこの人はこんな考えに至ったんだろう？」とその人の隠れた背景や可能性（ポテンシャル）に興味を持つ。", 
                scores: { socio: { Ne: 3, Fi: 2 }, mbti: { Ne: 3, Fi: 2 }, ennea: { 7: 2, 4: 1 } } 
            },
            { 
                text: "内心面倒だと思っても、場の空気が悪くならないように「なるほどですね〜」と笑顔で相槌を打って流す。", 
                scores: { socio: { Fe: 3, Si: 2 }, mbti: { Fe: 3, Si: 2 }, ennea: { 9: 2, 2: 1 } } 
            }
        ]
    },
    {
        id: "q_holiday_plan", 
        type: "radio",
        text: "ポッカリ予定が空いた休日。あなたの「理想の過ごし方」に一番近いのは？",
        options:[
            { 
                text: "誰かを誘って、みんながワイワイ楽しめるようなサプライズやイベントを企画して盛り上がる！", 
                scores: { socio: { Fe: 3, Ne: 2 }, mbti: { Fe: 3, Ne: 2 }, ennea: { 7: 2, 2: 2 } } 
            },
            { 
                text: "自分だけの快適な空間で、身の回りを整理整頓したり、無駄のない趣味のルーティンを淡々とこなす。", 
                scores: { socio: { Si: 3, Ti: 2 }, mbti: { Si: 2, Ti: 2 }, ennea: { 9: 2, 1: 1 } } 
            },
            { 
                text: "全く新しい場所に行って、ワクワクする出会いやインスピレーション（可能性）を自由に探し回る。", 
                scores: { socio: { Ne: 3, Fi: 2 }, mbti: { Ne: 3, Se: 1 }, ennea: { 7: 3, 4: 1 } } 
            },
            { 
                text: "長期的な目標のために、今やっておくべきタスクを一気に片付けて盤面（状況）を有利に進める。", 
                scores: { socio: { Te: 3, Ni: 2 }, mbti: { Te: 3, Ni: 2 }, ennea: { 3: 3, 8: 1 } } 
            }
        ]
    },
    {
        id: "q_leadership", 
        type: "radio",
        text: "チームで何かを成し遂げなければならない時、あなたの無意識のポジションは？",
        options:[
            { 
                text: "全体のモチベーションを上げ、みんなの感情や適性を調整しながらゴールに導く。", 
                scores: { socio: { Fe: 3, Si: 1 }, mbti: { Fe: 3, Si: 1 }, ennea: { 2: 2, 6: 2 } } 
            },
            { 
                text: "実権を握り、障害を力技で排除しながら、最短・最速で結果を出すよう指示を飛ばす。", 
                scores: { socio: { Se: 3, Te: 2 }, mbti: { Te: 3, Se: 2 }, ennea: { 8: 3, 3: 1 } } // ★ソシオSe主導、MBTI Te主導！
            },
            { 
                text: "表には立たず、全体のシステムの設計図を描き、バグが起きないよう裏から構造を最適化する。", 
                scores: { socio: { Ti: 3, Ne: 2 }, mbti: { Ni: 3, Te: 2 }, ennea: { 5: 3, 1: 1 } } // ★ソシオTi/Ne、MBTI Ni/Te（INTJ）！
            },
            { 
                text: "チームの枠組みにとらわれず、個々の才能を見抜き、新しいアイデアや突破口を提案する。", 
                scores: { socio: { Ne: 3, Fi: 1 }, mbti: { Ne: 3, Fi: 2 }, ennea: { 7: 2, 4: 1 } } 
            }
        ]
    },
    {
        id: "q_conflict_cost",
        type: "radio",
        text: "「人と激しく対立しても構わない・敵に回してもいい」と思うのはどんな時？",
        options:[
            { 
                text: "自分の『持論（論理的真理）』が絶対に正しい時。……でも、そもそも対立して敵を作るメリット（コスパ）ある？と躊躇する。", 
                scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ti: 2, Ni: 2 }, ennea: { 5: 3, 9: 1 } } // ★ソシオTi/Ne、MBTI Ni/Ti
            },
            { 
                text: "社会全体が間違っている時。バカと群れて消耗するくらいなら、社会を敵に回して一人で生きる覚悟はある。", 
                scores: { socio: { Ni: 3, Te: 2 }, mbti: { Ni: 2, Te: 2 }, ennea: { 5: 2, 4: 1 } } 
            },
            { 
                text: "自分の『大切な人』や『絶対に譲れない道徳・価値観』が不当に踏みにじられた時。", 
                scores: { socio: { Fi: 3 }, mbti: { Fi: 3 }, ennea: { 4: 2, 2: 2 } } 
            },
            { 
                text: "自分のテリトリー、権力、尊厳を舐められた時。即座に徹底的に叩き潰す。", 
                scores: { socio: { Se: 3 }, mbti: { Se: 2, Te: 2 }, ennea: { 8: 3 } } 
            }
        ]
    },
    {
        id: "q_pure_f_vs_t",
        type: "radio",
        text: "悲しい映画や、理不尽なニュースを見た後の『感情の処理』はどうなる？",
        options:[
            { 
                text: "「どうしてこんな悲劇が…」と感情に完全に飲み込まれ、しばらく引きずる。誰かにこの辛さを共有したくなる。", 
                scores: { socio: { Fe: 3, Fi: 2, Ti: -2 }, mbti: { Fe: 3, Fi: 2, Ti: -2 }, ennea: { 2: 2, 4: 2 } } 
            },
            { 
                text: "最初はショックを受けるが、すぐに「なぜこの構図が悲劇を生んだのか」「システムの問題点は何か」という『構造の分析』に切り替わる。", 
                scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ti: 2, Ni: 2 }, ennea: { 5: 3, 1: 1 } } 
            },
            { 
                text: "「で、結局誰が悪くて、どう責任を取るの？」と、事実関係と責任の所在（実害）だけを気にする。", 
                scores: { socio: { Te: 3 }, mbti: { Te: 3 }, ennea: { 8: 2, 3: 1 } } 
            },
            { 
                text: "自分の人生には直接関係ないので、特に何も思わない。すぐ忘れる。", 
                scores: { socio: { Si: 2 }, mbti: { Si: 2 }, ennea: { 9: 3 } } 
            }
        ]
    },
    {
        id: "q_rule_breaker",
        type: "radio",
        text: "目の前で「誰かが決められたルールを破った」のを見た時、どう思う？",
        options:[
            { 
                text: "「なぜ破ったのか（条件）」と「そのルール自体に論理的な欠陥（無駄）がないか」をまず検証する。", 
                scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ti: 3, Ne: 1 }, ennea: { 5: 3 } } 
            },
            { 
                text: "「実害」が出ているかどうか。誰も損をしていないなら、いちいち指摘する方が面倒くさい。", 
                scores: { socio: { Te: 3, Ni: 1 }, mbti: { Te: 3, Ni: 1 }, ennea: { 3: 1, 9: 1 } } 
            },
            { 
                text: "みんなが守っているのに和を乱す行為であり、不公平だから許せない。", 
                scores: { socio: { Fe: 2, Si: 2 }, mbti: { Fe: 2, Si: 2 }, ennea: { 1: 2, 6: 2 } } 
            },
            { 
                text: "その人が「どんなやむを得ない事情を抱えていたのか」を個別に考慮してあげたい。", 
                scores: { socio: { Fi: 3 }, mbti: { Fi: 3 }, ennea: { 4: 2, 2: 1 } } 
            }
        ]
    },
    {
        id: "q_what_is_he_saying",
        type: "radio",
        text: "今日一日で、心の中で『は？何言ってんだコイツ』と思った回数は？",
        options:[
            { 
                text: "10回以上。世の中バカと非効率な奴、意味不明なこと言う奴ばっかりだ。", 
                scores: { socio: { Se: 3, Te: 2 }, mbti: { Te: 3, Se: 1 }, ennea: { 8: 3, 3: 1 } } // ★覇王！
            },
            { 
                text: "1〜3回。他人の言動の「論理的矛盾」や「前提のおかしさ」に気づいた時だけツッコミを入れる。", 
                scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ti: 3, Ni: 1 }, ennea: { 5: 3, 1: 1 } } 
            },
            { 
                text: "数えていない。そもそも他人に興味がないし、関わらないようにスルーしている。", 
                scores: { socio: { Ni: 3, Si: 1 }, mbti: { Ni: 3, Si: 2 }, ennea: { 5: 1, 9: 2 } } 
            },
            { 
                text: "0回。人はそれぞれ事情や考え方があるから、よっぽどのことがない限りそんな風には思わない。", 
                scores: { socio: { Fe: 3, Fi: 2 }, mbti: { Fe: 3, Fi: 2 }, ennea: { 2: 3, 9: 1 } } 
            }
        ]
    },
    {
        id: "q_grudge_memory",
        type: "radio",
        text: "昔、親戚や他人に言われた「心ない一言（容姿の指摘など）」をどう処理している？",
        options:[
            { 
                text: "一生許さない。その時の感情や情景が今でも鮮明に蘇り、ずっと根に持っている。", 
                scores: { socio: { Fi: 3, Se: 1 }, mbti: { Si: 3, Fi: 2 }, ennea: { 1: 2, 4: 1, 6: 2 } } // ★ソシオFi主導(ESI)、MBTI Si主導(ISFJ)の完全再現！！
            },
            { 
                text: "恨んではいない。ただ「一般的に自分はそういう評価なんだ」という『客観的データ』として受け入れ、静かに自信をなくす。", 
                scores: { socio: { Ti: 3, Ni: 2 }, mbti: { Ti: 2, Ni: 3 }, ennea: { 5: 3, 9: 1 } } 
            },
            { 
                text: "言われたこと自体忘れた。過去の些細なことより、今と未来の方が大事。", 
                scores: { socio: { Se: 3, Ne: 2  }, mbti: { Se: 3, Ne: 2  }, ennea: { 8: 2, 7: 2 } } 
            },
            { 
                text: "思い出すと悲しくなるが、関係を悪化させたくないので表には出さず飲み込む。", 
                scores: { socio: { Fe: 2, Si: 1 }, mbti: { Fe: 2, Si: 2 }, ennea: { 9: 3, 2: 1 } } 
            }
        ]
    },
    {
        id: "q_fe_pressure_fixed", 
        type: "radio",
        text: "家族や友人から「悲しいと思わないの？ 人の心ないの？」と責められた時、あなたの反応は？",
        options:[
            { 
                text: "「感情論で騒いでも解決しないだろ。原因と対策を考える方が重要だ」と冷めつつ、説明するのも面倒に感じる。", 
                scores: { socio: { Ti: 3, Te: 1, Fe: -3 }, mbti: { Ti: 2, Te: 2 }, ennea: { 5: 3, 8: 1 } } 
            },
            { 
                text: "「ごめん、私もすごく悲しいよ…」と相手のペースに合わせて同調する。", 
                scores: { socio: { Fe: 2, Si: 1 }, mbti: { Fe: 2, Si: 1 }, ennea: { 9: 2, 2: 1 } },
                followUp: {
                    id: "q_fe_pressure_followup",
                    type: "radio",
                    text: "👁️ [System: 思考の深掘り] ほんとに？ その同調、心から言ってる？",
                    options:[
                        { text: "はい。相手が悲しんでいるのを見ると、本当に申し訳なくなり、自分も悲しくなる。", scores: { socio: { Fe: 3, Fi: 2 }, mbti: { Fe: 3, Fi: 2 }, ennea: { 2: 2, 9: 2 } } }, 
                        { text: "いや、内心では『うわ、めんどくさ…』と思いながら、角が立たないように『社会的な正解（適当なフリ）』を出力しているだけ。", scores: { socio: { Ti: 3, Fe: -2 }, mbti: { Ti: 3, Fe: -2 }, ennea: { 5: 2, 3: 1 } } } 
                    ]
                }
            },
            { 
                text: "「なんでそんな事言うの！私だって悲しいのに！」と反発するか、深く傷つく。", 
                scores: { socio: { Fi: 3 }, mbti: { Fi: 3 }, ennea: { 4: 3, 2: 1 } } 
            },
            { 
                text: "「は？同情して何になるの？」と真っ向から論破し、相手の感情論を叩き潰す。", 
                scores: { socio: { Te: 3, Se: 2 }, mbti: { Te: 3, Se: 1 }, ennea: { 8: 3 } } 
            }
        ]
    },
    {
        id: "q_doorslam",
        type: "radio",
        text: "【ドアスラム現象】人間関係の『限界』を迎えた時、あなたはどうなりがちですか？",
        options:[
            { 
                text: "普段はずっと笑って許しているが、ある日突然メーターが振り切れ、一切の連絡を絶って完全にこの世から消える。", 
                scores: { socio: { Ni: 3, Fe: 2, Fi: 2 }, mbti: { Ni: 3, Fi: 2 }, ennea: { 9: 2, 4: 2 } } 
            },
            { 
                text: "そもそも限界を迎える前に、関係維持の『コストに見合わない』と判断した時点で、早々に未練なくフェードアウトする。", 
                scores: { socio: { Ti: 2, Te: 2, Ni: 2 }, mbti: { Ti: 2, Te: 2, Ni: 2 }, ennea: { 5: 3, 8: 1 } } 
            },
            { 
                text: "相手に直接ブチギレて、白黒はっきり決着をつけてから関係を断つ。", 
                scores: { socio: { Se: 3, Te: 1 }, mbti: { Te: 2, Se: 2 }, ennea: { 8: 3 } } 
            },
            { 
                text: "限界でも自分から関係を切れず、ダラダラと付き合い続けて消耗し続ける。", 
                scores: { socio: { Si: 2, Fe: 1 }, mbti: { Si: 2, Fe: 2 }, ennea: { 6: 3, 2: 1 } } 
            }
        ]
    },
    {
        id: "q_writing_style",
        type: "radio",
        text: "文章を書く時や、人に何かを説明する時のあなたのスタイル（脳内構造）は？",
        options:[
            { 
                text: "頭の中で論理検証しつつ湧き出る可能性を処理するため、整理する余裕なく『思考の垂れ流し』になりがち。他人に分かりやすく説明するのは苦手。", 
                scores: { socio: { Ti: 3, Ne: 2 }, mbti: { Ti: 2, Ni: 3 }, ennea: { 5: 3 } } // ★ソシオLII的、MBTI INTJ的！
            },
            { 
                text: "要点だけを端的にまとめ、結論から話す。無駄な情報は削ぎ落とす。", 
                scores: { socio: { Te: 3, Ni: 1 }, mbti: { Te: 3, Ni: 2 }, ennea: { 3: 2, 8: 1 } } 
            },
            { 
                text: "相手が理解しやすいように、例え話や感情表現を交えて、丁寧に構成する。", 
                scores: { socio: { Fe: 3 }, mbti: { Fe: 3 }, ennea: { 2: 3, 9: 1 } } 
            },
            { 
                text: "起承転結をしっかり作り、過去の事実や時系列に沿って正確に書く。", 
                scores: { socio: { Si: 2, Te: 2 }, mbti: { Si: 3, Te: 2 }, ennea: { 1: 3, 6: 1 } } 
            }
        ]
    },
    {
        id: "q_logic_puzzle",
        type: "radio",
        text: "『野菜は何千年も前から存在していた。故に目の前にある野菜は野菜ではない』という哲学的な問いを出されたら？",
        options:[
            { 
                text: "「『野菜の定義』とは何か？」から始まり、前提条件に論理的な破綻がないか真面目に検証し始める。", 
                scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ti: 3, Ni: 1 }, ennea: { 5: 3, 1: 1 } } 
            },
            { 
                text: "「は？？ 何言ってんだコイツ」と一秒で思考放棄し、無駄な問答を切り捨てる。", 
                scores: { socio: { Se: 3, Te: 2 }, mbti: { Te: 3, Se: 1 }, ennea: { 8: 3, 3: 1 } } 
            },
            { 
                text: "言葉遊びとして面白い！と、さらに屁理屈や別の視点を被せて遊ぶ。", 
                scores: { socio: { Ne: 3 }, mbti: { Ne: 3 }, ennea: { 7: 3 } } 
            },
            { 
                text: "「つまり、本質的な概念は目の前の物質とは別次元にあるという暗喩だ」と深読みする。", 
                scores: { socio: { Ni: 3, Fi: 1 }, mbti: { Ni: 3 }, ennea: { 4: 2, 5: 1 } } 
            }
        ]
    },
    {
        id: "q_f_typing_test",
        type: "radio",
        text: "心理テストで「悲しい感情に自分の意志で入れますか？」「同情をどう表現しますか？」と聞かれたら？",
        options:[
            { 
                text: "「知らん。わからん。関係ない。」そもそも感情をコントロールする意味も、表現する方法もわからない。", 
                scores: { socio: { Ti: 3, Fe: -3, Fi: -3 }, mbti: { Ti: 3, Fe: -3, Fi: -3 }, ennea: { 5: 3, 9: 1 } } 
            },
            { 
                text: "はい、他人の悲しみに入り込んで一緒に泣くことができます。", 
                scores: { socio: { Fe: 3, Fi: 2 }, mbti: { Fe: 3, Fi: 2 }, ennea: { 2: 3, 4: 2 } } 
            },
            { 
                text: "同情は言葉ではなく、相手を助けるための具体的な『行動』や『解決策』で示す。", 
                scores: { socio: { Te: 3 }, mbti: { Te: 3 }, ennea: { 1: 2, 8: 1 } } 
            },
            { 
                text: "同情しているフリをして、相手が望む言葉を適当に返す。（ツールとしての共感）", 
                scores: { socio: { Fe: 1, Te: 1 }, mbti: { Fe: 1, Te: 1 }, ennea: { 3: 2, 9: 1 } } 
            }
        ]
    },
    {
        id: "q_new_rule_fixed", 
        type: "radio",
        text: "職場で「タイムカード廃止、PCでクリック」という新しいルールが導入されました。あなたの脳内は？",
        options:[
            { 
                text: "「印鑑の手間やスタッフの管理コストが減るな。実用的で合理的だ」とメリット（効率・コスト）を瞬時に計算し歓迎する。", 
                scores: { socio: { Te: 3, Ti: 1 }, mbti: { Te: 3, Ti: 1 }, ennea: { 5: 2, 3: 1 } } 
            },
            { 
                text: "「どうせこのルールもすぐ形骸化するか、別のシステムに変わるだろう」と結末を予測し、最小限の労力でやり過ごす。", 
                scores: { socio: { Ni: 3, Te: 1 }, mbti: { Ni: 3, Te: 1 }, ennea: { 5: 2, 9: 1 } } 
            },
            { 
                text: "ルール変更で戸惑う人がいないか、みんながスムーズに移行できるかを気にかける。", 
                scores: { socio: { Fe: 3, Si: 1 }, mbti: { Fe: 3, Si: 1 }, ennea: { 2: 3, 9: 1 } } 
            },
            { 
                text: "「以前のやり方（タイムカード）の方が慣れていて安心だったのに…」と変化自体にストレスを感じる。", 
                scores: { socio: { Si: 3 }, mbti: { Si: 3 }, ennea: { 6: 3 } } 
            }
        ]
    },
    {
        id: "q_meta_doubt",
        type: "radio", 
        text: "【System】この質問（診断テスト全般）は正確ですか？",
        options:[
            { 
                text: "はい。設問によく答えられていると思う。", 
                scores: { socio: { Fe: 1, Si: 1 }, mbti: { Si: 2, Fe: 1 }, ennea: { 9: 1, 6: 1 } } 
            },
            { 
                text: "いいえ。人間の複雑な認知を数個の選択肢で測れるわけがない。", 
                scores: { socio: { Fi: 2, Ni: 1 }, mbti: { Fi: 2, Ni: 1 }, ennea: { 4: 2, 8: 1 } } 
            },
            { 
                text: "条件不足。「正確さ」の定義が曖昧であり、前提条件やコンテキストによって異なるため一概に回答できない。", 
                scores: { socio: { Ti: 3, Ne: 2 }, mbti: { Ti: 3, Ni: 1 }, ennea: { 5: 3, 1: 2 } } // ★ソシオNe、MBTI Ni！
            }
        ]
    },
    {
        id: "q_core_fear",
        type: "radio", 
        text: "あなたが一番『恐れるもの』は何ですか？",
        options:[
            { text: "【無知・無能】仕組みが理解できないこと。対処法（知識）を持たないこと。", scores: { socio: { Ti: 3 }, mbti: { Ti: 3 }, ennea: { 5: 4 } } },
            { text: "【無力・支配】自分のテリトリーや自由を他人にコントロールされること。", scores: { socio: { Se: 3 }, mbti: { Te: 2, Se: 1 }, ennea: { 8: 4, 3: 1 } } },
            { text: "【拒絶・孤立】誰からも必要とされない、愛されないこと。", scores: { socio: { Fe: 2, Fi: 2 }, mbti: { Fe: 2, Fi: 2 }, ennea: { 2: 4, 9: 1 } } },
            { text: "【無価値・凡庸】自分らしさがない、アイデンティティや特別な意味がないこと。", scores: { socio: { Fi: 3, Ne: 1 }, mbti: { Fi: 3 }, ennea: { 4: 4 } } }
        ]
    },
    {
        id: "q_anxiety_loop",
        type: "radio",
        text: "不安なこと（例：未経験のトラブル、予測外の事態）が起きた時、あなたの思考回路は？",
        options:[
            { 
                text: "①未来予測 → ②対策（代替案）想定 → ③不安消去。システム化して終わるので、無駄に反芻して悩まない。", 
                scores: { socio: { Ni: 3, Ti: 2 }, mbti: { Ni: 3, Te: 2 }, ennea: { 5: 2, 1: 1 } } 
            },
            { 
                text: "「もしこうなったら…」「でもあっちの可能性も…」と、最悪のパターンが無限に浮かんでぐるぐる反芻する。", 
                scores: { socio: { Ne: 2, Fi: 1 }, mbti: { Ne: 2, Fi: 2 }, ennea: { 6: 3, 4: 1 } } 
            },
            { 
                text: "不安を感じること自体が嫌なので、楽しいことや別の作業で気を紛らわす。", 
                scores: { socio: { Se: 2 }, mbti: { Se: 2 }, ennea: { 7: 3, 9: 1 } } 
            },
            { 
                text: "過去の似たような経験やデータと照らし合わせて、安全策を確実になぞる。", 
                scores: { socio: { Si: 3, Te: 1 }, mbti: { Si: 3 }, ennea: { 6: 2, 1: 1 } } 
            }
        ]
    },
    {
        id: "q_originality",
        type: "radio",
        text: "創作活動や仕事において、「オリジナリティ（個性）」とは何だと思いますか？",
        options:[
            { 
                text: "過去の膨大なデータ（他人の作品や知識）を研究し、自分の中で要素を分解・再構築した結果生み出される『出力のバグ（差異）』。", 
                scores: { socio: { Ti: 3, Ne: 2 }, mbti: { Ti: 2, Ni: 3 }, ennea: { 5: 3 } } // ★ソシオTi/Ne、MBTI Ni/Ti
            },
            { 
                text: "自分の魂の奥底から湧き上がる、誰にも真似できない『唯一無二の感情や世界観』の表現。", 
                scores: { socio: { Fi: 3 }, mbti: { Fi: 3 }, ennea: { 4: 3 } } 
            },
            { 
                text: "世間にウケる要素を組み合わせ、最も効率よく結果（評価や利益）を出せる『最適なパッケージング』。", 
                scores: { socio: { Te: 3, Ni: 1 }, mbti: { Te: 3, Ni: 1 }, ennea: { 3: 3, 8: 1 } } 
            },
            { 
                text: "個性なんてどうでもいい。求められた役割やルールを、いかに完璧に・正確にこなせるかが重要だ。", 
                scores: { socio: { Ti: 1, Si: 2 }, mbti: { Si: 3, Te: 1 }, ennea: { 1: 3, 6: 1 } } 
            }
        ]
    },
    {
        id: "q_dislike_reason",
        type: "radio",
        text: "「あの人、なんか嫌い」「人間関係が孤独だ」と感じる時、その理由はどう処理される？",
        options:[
            { 
                text: "「なんか」ではなく、「圧が強すぎる」「予測した反応と違い、約束を破られた（信用低下）」等、明確な原因・論理的エラーとして処理する。", 
                scores: { socio: { Ti: 3, Ni: 2 }, mbti: { Ti: 2, Ni: 3 }, ennea: { 5: 3, 1: 1 } } 
            },
            { 
                text: "「波長が合わない」「私の本音を理解してくれない」という、言語化しにくい『心のシャッター（拒絶感）』として処理する。", 
                scores: { socio: { Fi: 3 }, mbti: { Fi: 3 }, ennea: { 4: 3, 9: 1 } } 
            },
            { 
                text: "「自分の作業効率を落とすボトルネックだ」と実害ベースで処理し、感情的な憎悪は抱かない。", 
                scores: { socio: { Te: 3 }, mbti: { Te: 3 }, ennea: { 3: 2, 8: 2 } } 
            },
            { 
                text: "「和を乱す人だ」「空気を悪くする」と、集団への悪影響として処理する。", 
                scores: { socio: { Fe: 3, Si: 1 }, mbti: { Fe: 3, Si: 1 }, ennea: { 2: 2, 6: 1 } } 
            }
        ]
    },

    {
        id: "q_fandom_delusion",
        type: "radio",
        text: "【キャラ解釈・物語の楽しみ方】公式設定で「冷酷・優しさマイナス」とされているキャラを、「本当は優しいんだ尊い…！」と解釈している人を見たら？",
        options:[
            { 
                text: "「いや、公式の設定（事実）と矛盾してるじゃん。ただの妄想を押し付けるな」と内心納得がいかない。", 
                scores: { socio: { Ti: 3 }, mbti: { T: 3, J: 1 }, ennea: { 5: 2, 1: 2 } } // T型の事実・設定重視
            },
            { 
                text: "自分は物語に介入（自己投影）せず、『ゲームマスター的ポジション』から関係性や構造をただ観察していたい。", 
                scores: { socio: { Ti: 2, Ni: 2, Fe: -1 }, mbti: { N: 2, I: 2 }, ennea: { 5: 3, 4: 1 } } // みつきのGM視点！夢小説NG！
            },
            { 
                text: "「わかる！その裏にある不器用な優しさがエモいよね！」と感情を乗せて一緒に楽しむ。", 
                scores: { socio: { Fe: 3, Fi: 1 }, mbti: { F: 3 }, ennea: { 2: 2, 4: 1 } } // F型の感情補完
            },
            { 
                text: "自分を主人公にして、そのキャラと恋愛する夢小説的な没入感を楽しむ。", 
                scores: { socio: { Fi: 3, Si: 1 }, mbti: { F: 2, I: 1 }, ennea: { 4: 3, 9: 1 } } // Fi的自己投影
            }
        ]
    },
    {
        id: "q_hiding_bento",
        type: "radio",
        text: "学校や職場で、自分のお弁当を隠して食べたり、スマホの画面を見られたくない本当の理由は？",
        options:[
            { 
                text: "自分の情報（プライバシー）を明かすメリットが皆無だし、勝手に踏み込まれて関係が悪化するリスク（未来のノイズ）を回避したいから。", 
                scores: { socio: { Ti: 2, Ni: 3, Fe: -2 }, mbti: { I: 3, T: 2 }, ennea: { 5: 3, 6: 1 } } // みつきのバキバキコスト計算！
            },
            { 
                text: "「こんなの食べてるんだ、これ好きなんだ」と他人に思われたり、評価されること自体が恥ずかしくて不安だから。", 
                scores: { socio: { Fi: 2, Fe: 1 }, mbti: { F: 2, I: 2 }, ennea: { 4: 2, 6: 2 } } // 一般的なSAD（社交不安）やF型
            },
            { 
                text: "そもそも人が視界に入るだけで邪魔。一人で効率よく食べてさっさと自分の作業に戻りたい。", 
                scores: { socio: { Te: 3, Si: 1 }, mbti: { Te: 2 }, ennea: { 8: 1, 3: 1 } } 
            },
            { 
                text: "隠さない。「美味しそうでしょ！」と見せつけるか、シェアする。", 
                scores: { socio: { Fe: 2, Se: 2 }, mbti: { E: 3 }, ennea: { 2: 2, 7: 1 } } 
            }
        ]
    },
    {
        id: "q_money_waste",
        type: "radio",
        text: "「推し活」「ホスト」「旅行」などに大金を使うことについて、どう思う？",
        options:[
            { 
                text: "終わったら消える一過性のものに、苦労して稼いだお金（コスト）を使う意味が理解不能。無駄すぎる。", 
                scores: { socio: { Ni: 3, Ti: 2, Si: -1 }, mbti: { N: 2, J: 2 }, ennea: { 5: 3, 1: 1 } } // みつきのNi-Ti的「終わったら無」の悟り
            },
            { 
                text: "自分自身の知識や実用的なスキル、または快適な環境を整える「投資」にならお金を使う。", 
                scores: { socio: { Te: 2, Si: 2 }, mbti: { S: 2, T: 1 }, ennea: { 3: 2, 5: 1 } } 
            },
            { 
                text: "形に残らなくても、その瞬間の「感情の高ぶり」や「思い出」こそが人生の価値だと思う。", 
                scores: { socio: { Fe: 2, Fi: 2 }, mbti: { F: 3 }, ennea: { 4: 2, 7: 2 } } 
            },
            { 
                text: "その経験が自分のステータスになったり、人に自慢できるなら惜しまず使う。", 
                scores: { socio: { Se: 3 }, mbti: { Se: 3, Te: 1 }, ennea: { 3: 3, 8: 1 } } 
            }
        ]
    },
    {
        id: "q_lsi_vs_sli",
        type: "radio",
        text: "職場で「新しいルールや手順」が導入されました。あなたの対応は？",
        options:[
            { 
                text: "ルールを正確に理解し、例外なく厳格に執行する。秩序を守るためには多少の強制力（圧）も必要だ。", 
                scores: { socio: { Ti: 3, Se: 2 }, mbti: { J: 3, S: 1 }, ennea: { 1: 3, 6: 1 } } 
            },
            { 
                text: "そのルールが「自分の作業をいかに快適に、労力（無駄）を省いてくれるか」だけを見る。面倒なら適当にマイペースを貫く。", 
                scores: { socio: { Si: 3, Te: 2 }, mbti: { P: 2, S: 2 }, ennea: { 9: 3, 5: 1 } } 
            },
            { 
                text: "ルールの「構造的な欠陥」を探し、より良いシステムや代替案がないか脳内でシミュレーションする。", 
                scores: { socio: { Ti: 2, Ne: 3 }, mbti: { N: 3, P: 1 }, ennea: { 5: 2, 7: 1 } } 
            },
            { 
                text: "「どうせこのルールもすぐ形骸化するだろう」と結末を予測し、最小限の労力でやり過ごす。", 
                scores: { socio: { Ni: 3, Te: 2 }, mbti: { N: 2, J: 1 }, ennea: { 5: 3 } } 
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
        id: "q_empathy_fail",
        type: "radio",
        text: "誰かを慰めようとして、なぜか逆に相手を怒らせてしまった。その時のあなたの内心は？",
        options:[
            { 
                text: "「なんで怒ってるの？」と、自分の『行動や言葉のチョイス』のどこに論理的バグがあったのかを分析・反省する。", 
                scores: { socio: { Ti: 3, Fe: -1 }, mbti: { T: 3, I: 1 }, ennea: { 5: 3, 1: 1 } } // みつきのドT反省ｗｗ
            },
            { 
                text: "「傷つけてしまった…」と、相手の感情に寄り添えなかった自分を激しく責め、心が痛む。", 
                scores: { socio: { Fe: 2, Fi: 2 }, mbti: { F: 3 }, ennea: { 2: 2, 4: 1 } } // 真のF型
            },
            { 
                text: "「まあそういう時もある」と割り切り、早々に別の解決策や話題を提示する。", 
                scores: { socio: { Te: 2 }, mbti: { Te: 2 }, ennea: { 8: 1, 3: 1 } } 
            },
            { 
                text: "ひたすら謝り倒して、なんとかその場の空気を鎮めようとする。", 
                scores: { socio: { Fe: 2, Si: 1 }, mbti: { Fe: 2 }, ennea: { 9: 2, 6: 1 } } 
            }
        ]
    },
    {
        id: "q_kotori_study",
        text: "絶望的に成績が悪い、または面倒な課題が溜まっている時、あなたはどうする？",
        type: "radio",
        options:[
            { 
                text: "「今更やったところできっと追いつけないし」と完全に諦めて、楽な方に逃げる（遊ぶ）。", 
                scores: { socio: { Ni: 2, Te: -1, Se: -1 }, mbti: { P: 2 }, ennea: { 7: 3, 9: 1 } } // 享楽ILI（ことりくん！）
            },
            { 
                text: "やる気はないが、赤点や最悪の事態（ペナルティ）だけは避けるための最低ラインの計算をしてこなす。", 
                scores: { socio: { Ti: 2, Ni: 1 }, mbti: { J: 1 }, ennea: { 5: 2, 6: 1 } } // みつきのLII防衛
            },
            { 
                text: "答えを丸写しするか、誰かにやらせる等、ズル賢く最短ルートで終わらせる。", 
                scores: { socio: { Te: 2, Se: 1 }, mbti: { Te: 2 }, ennea: { 3: 2, 8: 1 } } // Teの効率化
            },
            { 
                text: "「やばい！」と焦りながらも、結局直前まで手をつけられず泣きながら徹夜する。", 
                scores: { socio: { Ne: 1, Fi: 1 }, mbti: { P: 2, F: 1 }, ennea: { 6: 2, 4: 1 } } 
            }
        ]
    },
    {
        id: "q_ili_boyfriend",
        type: "radio",
        text: "「生きる目的」や「人生のモチベーション」について、あなたのスタンスに近いのは？",
        options:[
            { 
                text: "「長生きする理由がない。もはや生きるのもめんどくさい、いつリタイアしてもいい」という虚無主義。", 
                scores: { socio: { Ni: 3, Te: 2 }, mbti: { Ni: 2, P: 2 }, ennea: { 5: 2, 9: 1 } } 
            },
            { 
                text: "「普通（結婚・家族等）の生き方じゃなくても、創作や夢など、自分で見つけた『生きる目的』のために生きる」。", 
                scores: { socio: { Ti: 2, Ne: 2,  Ni: 2 }, mbti: { Ni: 2, J: 1 }, ennea: { 5: 2, 4: 1 } } 
            },
            { 
                text: "「難しく考えず、今この瞬間をどれだけ楽しく、快適に過ごせるかがすべて」。", 
                scores: { socio: { Se: 2, Si: 2 }, mbti: { S: 3, P: 2 }, ennea: { 7: 3, 9: 1 } } 
            },
            { 
                text: "「誰かと人生を一緒に楽しむこと。周りの人と良い関係を築くこと」。", 
                scores: { socio: { Fe: 2, Fi: 2 }, mbti: { F: 3 }, ennea: { 2: 3, 6: 1 } } 
            }
        ]
    },
    {
        id: "q_alternative_plan_fixed", // みつき修正版！
        type: "radio",
        text: "問題が起きた。解決法（代替案）はどうやって出す？",
        options:[
            { 
                text: "最も確実で効率的な『1つ』に絞り込み、それに賭ける。", 
                scores: { socio: { Ni: 2, Te: 1 }, mbti: { Ni: 2 }, ennea: { 1: 2, 5: 1 } } 
            },
            { 
                text: "まず最適な代替案を『1つ』出し、それがダメだった時にまた別の代替案を考える。", 
                scores: { socio: { Ti: 3, Ni: 2, Ne: 1 }, mbti: { J: 2, N: 1 }, ennea: { 5: 3, 6: 1 } } 
            },
            { 
                text: "前提条件によるので、一気に『3つ以上』の分岐ルート（可能性）を並べる。", 
                scores: { socio: { Ne: 3, Ti: 1 }, mbti: { P: 2, N: 2 }, ennea: { 7: 2 } } 
            },
            { 
                text: "とりあえず目の前のことに手をつけ、やりながら考える。（臨機応変）", 
                scores: { socio: { Se: 3 }, mbti: { S: 2, P: 2 }, ennea: { 8: 2, 7: 1 } } 
            }
        ]
    },
    {
        id: "q_typing_hack",
        type: "radio",
        text: "「PCのタイピングが遅い」という課題がある。あなたはどうする？",
        options:[
            { 
                text: "「スマホで打ってLINE等でPCに送った方が正確で速い」。既存の練習（コスト）をすっ飛ばして目的を達成する。", 
                scores: { socio: { Ni: 3, Ti: 2, Si: -2 }, mbti: { N: 2, T: 2 }, ennea: { 5: 2, 3: 1 } } // みつきの大天才ハックｗｗ
            },
            { 
                text: "毎日コツコツ練習して、タイピング技術そのものをちゃんと上達させる。", 
                scores: { socio: { Si: 3, Te: 1 }, mbti: { S: 2, J: 2 }, ennea: { 1: 2, 3: 1 } } // Si/Teの王道
            },
            { 
                text: "「まあいっか、なんとかなるっしょ」と特に何もしない。", 
                scores: { socio: { Se: 1, Fi: 1 }, mbti: { P: 2 }, ennea: { 9: 2, 7: 1 } } 
            },
            { 
                text: "音声入力や最新のAIツールなど、全く新しいアプローチを試してみる。", 
                scores: { socio: { Ne: 2, Te: 1 }, mbti: { N: 2 }, ennea: { 7: 2, 5: 1 } } 
            }
        ]
    },
    {
        id: "q_misunderstood",
        type: "radio",
        text: "人に『理解されない』と感じた時、あなたはどう思う？",
        options:[
            { 
                text: "「そもそも100%理解するなんて無理だし、理解されるメリット（必要性）ある？」と考える。（メタ認知・コスト計算）", 
                scores: { socio: { Ti: 3, Ni: 1 }, mbti: { T: 3, I: 1 }, ennea: { 5: 3 } } // みつきのTi！
            },
            { 
                text: "悲しいし傷つくけれど、もうこれ以上傷つきたくないから自分を閉ざす。", 
                scores: { socio: { Fi: 3 }, mbti: { F: 2, I: 2 }, ennea: { 4: 2, 9: 2 } } 
            },
            { 
                text: "仕方ない。でもなんとか自分を分かってもらえるように必死に説明したくなる。", 
                scores: { socio: { Fe: 2, Te: 1 }, mbti: { E: 2 }, ennea: { 3: 2, 2: 1 } } 
            },
            { 
                text: "全く気にしない。自分が正解だと分かっていればそれでいい。", 
                scores: { socio: { Ni: 2, Se: 2 }, mbti: { J: 2 }, ennea: { 8: 2, 5: 1 } } 
            }
        ]
    },
    {
        id: "q_hurt_reason",
        type: "radio",
        text: "「自分が傷ついたり、人に嫌われるのは嫌だ」。その『本当の理由（深層動機）』はどれに近い？",
        options:[
            { 
                text: "精神エネルギーを無駄に消費するだけで、合理的なメリットが一切ないから。", 
                scores: { socio: { Ti: 3, Ni: 1 }, mbti: { T: 3 }, ennea: { 5: 3, 6: 1 } } // みつきのTi的リスク回避！
            },
            { 
                text: "自分の心の中の大切な価値観が踏みにじられ、純粋に苦痛だから。", 
                scores: { socio: { Fi: 3 }, mbti: { F: 3 }, ennea: { 4: 3, 9: 1 } } 
            },
            { 
                text: "場の空気が悪くなり、今後の人間関係や社会的な調和が崩れて面倒だから。", 
                scores: { socio: { Fe: 2, Te: 2 }, mbti: { E: 2 }, ennea: { 9: 2, 3: 1 } } 
            },
            { 
                text: "舐められたり、自分のテリトリーや権力を脅かされるのがムカつくから。", 
                scores: { socio: { Se: 3 }, mbti: { S: 2 }, ennea: { 8: 3 } } 
            }
        ]
    },
    {
        id: "q_secret_dilemma",
        type: "radio",
        text: "【ジレンマ問題】友達の重大な秘密を知っている。それを暴露すれば多くの人が助かる状況。どうする？",
        options:[
            { 
                text: "『秘密の価値（重大さ）』と『助かる命や状況のメリット・デメリット』を天秤にかけ、価値が高い方を選ぶ。（状況による）", 
                scores: { socio: { Ti: 2, Te: 2, Ni: 1 }, mbti: { T: 3 }, ennea: { 5: 2, 1: 1 } } // みつきのバキバキT型状況判断！
            },
            { 
                text: "友達との絆や信頼（自分の道徳心）が一番大事なので、絶対に秘密は守る。", 
                scores: { socio: { Fi: 3 }, mbti: { F: 3, P: 1 }, ennea: { 4: 2, 2: 1 } } 
            },
            { 
                text: "全体の幸福や正義が優先！多くの人を助けるために秘密を話す。", 
                scores: { socio: { Fe: 3 }, mbti: { F: 2, J: 1 }, ennea: { 1: 2, 2: 2 } } 
            },
            { 
                text: "状況を客観的に観察し、自分が直接責任を負わないで済むような裏ルートを探す。", 
                scores: { socio: { Ni: 2, Ne: 1 }, mbti: { N: 2 }, ennea: { 5: 2, 9: 1 } } 
            }
        ]
    },
    {
        id: "q_tea_party",
        type: "radio",
        text: "【お茶会シナリオ】あなたはお茶会に招待されましたが、席が1つ足りません。どうする？",
        options:[
            { text: "状況を観察し、誰がどう動くか（あるいはなぜ足りないのかの原因）をまず分析する。", scores: { socio: { Ti: 2, Ni: 2 }, mbti: { I: 2, T: 1 }, ennea: { 5: 3 } } },
            { text: "自分がサッと席を譲って立ち、波風を立てないようにする。", scores: { socio: { Fe: 2, Fi: 1 }, mbti: { F: 2, I: 1 }, ennea: { 9: 2, 2: 1 } } },
            { text: "すぐに椅子をどこかから持ってくるか、席の配置を効率よく変える。", scores: { socio: { Te: 2, Se: 1 }, mbti: { Te: 2, E: 1 }, ennea: { 3: 2, 8: 1 } } },
            { text: "「椅子足りないよー！」と誰かに聞くか、主催者にどうにかさせる。", scores: { socio: { Ne: 2, Fe: 1 }, mbti: { E: 2, P: 1 }, ennea: { 7: 2 } } }
        ]
    },
    {
        id: "q_size_change",
        type: "radio",
        text: "もし魔法で自分のサイズを変えられるなら、どちらを選ぶ？",
        options:[
            { text: "「状況による」または「なぜサイズが変わるのか、理由とメリットが知りたい」。", scores: { socio: { Ti: 3, Ne: 1 }, mbti: { T: 2, N: 1 }, ennea: { 5: 3 } } }, // メタ思考Ti
            { text: "10倍大きくなる。（全体を俯瞰したい、力を持ちたい）", scores: { socio: { Se: 2, Te: 1 }, mbti: { E: 2 }, ennea: { 8: 2, 3: 1 } } },
            { text: "10分の1に小さくなる。（こっそり観察したい、目立ちたくない）", scores: { socio: { Ni: 2, Si: 1 }, mbti: { I: 2 }, ennea: { 5: 1, 9: 2 } } }
        ]
    },
    {
        id: "q_ranking",
        type: "ranking", 
        text: "あなたが【最も重視する価値観】を、上から順にタップして順位をつけてください。（全部選ぶと次へ進めます）",
        options:[
            { text: "正確さ (論理・真理)", scores: { socio: { Ti: 2 }, mbti: { Ti: 2 }, ennea: { 5: 2, 1: 1 } } },
            { text: "効率 (結果・実用)", scores: { socio: { Te: 2 }, mbti: { Te: 2 }, ennea: { 3: 2, 8: 1 } } },
            { text: "調和 (感情・平和)", scores: { socio: { Fe: 2 }, mbti: { Fe: 2 }, ennea: { 9: 2, 2: 1 } } },
            { text: "可能性 (アイデア・未来)", scores: { socio: { Ne: 2 }, mbti: { Ne: 2 }, ennea: { 7: 2, 4: 1 } } },
            { text: "安定 (快適・ルーティン)", scores: { socio: { Si: 2 }, mbti: { Si: 2 }, ennea: { 6: 2, 9: 1 } } },
            { text: "自由 (独立・独自性)", scores: { socio: { Fi: 2, Se: 1 }, mbti: { Fi: 2, Se: 1 }, ennea: { 4: 2, 8: 1 } } }
        ]
    },
    {
        id: "q_cards",
        type: "cards", 
        text: "直感で、この4枚のカードから1枚を選んでください。",
        options:[
            { text: "♠A (スペードのエース：決断・権力・独立)", symbol: "♠A", color: "black", scores: { socio: { Se: 2, Te: 1 }, mbti: { Se: 2, Te: 2 }, ennea: { 8: 2, 3: 1 } } },
            { text: "♥7 (ハートの7：感情・夢・可能性)", symbol: "♥7", color: "red", scores: { socio: { Ne: 2, Fe: 1 }, mbti: { Ne: 2, Fe: 2 }, ennea: { 7: 2, 4: 1 } } },
            { text: "♦Q (ダイヤのクイーン：実務・安定・価値)", symbol: "♦Q", color: "red", scores: { socio: { Si: 2, Fi: 1 }, mbti: { Si: 2, Fi: 2 }, ennea: { 1: 2, 2: 1 } } },
            { text: "♣3 (クラブの3：論理・発展・探求)", symbol: "♣3", color: "black", scores: { socio: { Ti: 2, Ni: 1 }, mbti: { Ti: 2, Ni: 2 }, ennea: { 5: 2 } } }
        ]
    },
    {
        id: "q_daily_cost",
        type: "radio",
        text: "「バレンタイン」「文化祭」「スタバの新作」。こういう世間のイベントや流行に対して、あなたの脳内はどうなる？",
        options:[
            { 
                text: "「企業に踊らされてるだけ。液体に700円払うのも意味不明だし、陰キャ排除イベントとか虚しいだけ」と冷ややかに切り捨てる。", 
                scores: { socio: { Ni: 3, Te: 2 }, mbti: { Ni: 3, Te: 2 }, ennea: { 5: 2, 4: 1 } } 
            },
            { 
                text: "「スタバに700円払うなら、家でアイスと牛乳をミキサーにかけた方がコスパ良くね？」と、別の『安く済む代替案』を考える。", 
                scores: { socio: { Ti: 3, Ne: 2 }, mbti: { Ni: 2, Ti: 2, Te: 1 }, ennea: { 5: 3, 7: 1 } } // ★ソシオTi/Ne、MBTI Ni/Ti/Te
            },
            { 
                text: "なんだかんだで、自分なりの役目（ポスターを描く等）や、一人でひっそり楽しむ方法を見つけてやり過ごす。", 
                scores: { socio: { Si: 2, Ti: 1 }, mbti: { Si: 2, Ti: 1 }, ennea: { 9: 2, 5: 1 } } 
            },
            { 
                text: "素直にイベントに乗っかって、みんなでワイワイ楽しむのが好き！", 
                scores: { socio: { Fe: 3, Se: 1 }, mbti: { Fe: 3, Se: 1 }, ennea: { 2: 2, 7: 2 } } 
            }
        ]
    },
    {
        id: "q_hobby_giveup",
        type: "radio",
        text: "自分の趣味や特技（例えば絵を描くこと）について、「上には上がいる」「一生追いつけない」と悟った時、あなたはどうする？",
        options:[
            { 
                text: "「どうせ上には上がいる」と諦観し、それに対する取り組み方を変える。", 
                scores: { socio: { Ni: 2 }, mbti: { Ni: 2 }, ennea: { 5: 2 } },
                followUp: {
                    id: "q_hobby_followup",
                    type: "radio",
                    text: "👁️ [System: 思考の深掘り] 「取り組み方を変える」とは、具体的にどういうこと？",
                    options:[
                        { text: "リターンが見込めないなら、完全に熱を失うか、コスト（時間や労力）を割くのをやめる。", scores: { socio: { Te: 3, Ni: 1 }, mbti: { Te: 3 }, ennea: { 5: 2, 3: 1 } } },
                        { text: "パース等の『苦痛な基礎練』は捨てて、自分の『楽しい部分だけをやる』という遊びのシステムにルート変更する。", scores: { socio: { Ti: 3, Ne: 2 }, mbti: { Ni: 2, Ti: 2 }, ennea: { 7: 2, 5: 1 } } } // ★ソシオTi/Ne、MBTI Ni/Ti
                    ]
                }
            },
            { 
                text: "「上には上がいる」からこそ、劣っている部分を分析し、上手い人の技術を研究してさらにストイックに努力する。", 
                scores: { socio: { Ti: 2, Se: 2 }, mbti: { Te: 2, Si: 1 }, ennea: { 1: 3, 3: 1 } } 
            },
            { 
                text: "他人と比べること自体が無意味。自分自身の「内なる世界観」が表現できればそれでいい。", 
                scores: { socio: { Fi: 3 }, mbti: { Fi: 3 }, ennea: { 4: 3 } } 
            },
            { 
                text: "ただその行為自体が心地よいから、レベルとか関係なく淡々と続ける。", 
                scores: { socio: { Si: 3 }, mbti: { Si: 3 }, ennea: { 9: 3 } } 
            }
        ]
    },
    {
        id: "q_meaning_of_life",
        type: "radio",
        text: "「人生の意味」について、あなたの考え方に一番近い構造はどれ？",
        options:[
            { 
                text: "意味は最初からあるものではなく、生きた結果に対して『後から整合性を取られる（名付けられる）』ものだ。", 
                scores: { socio: { Ti: 3, Se: 1 }, mbti: { Ti: 3, Te: 1 }, ennea: { 1: 2, 5: 1 } } 
            },
            { 
                text: "生物学的に『命を繋ぐ』という一般論はあるが、必ずしもそれだけではない。人によって意味は異なり、様々な解釈（分岐）がある。", 
                scores: { socio: { Ti: 2, Ne: 2 }, mbti: { Ni: 2, Ti: 2 }, ennea: { 5: 3, 9: 1 } } 
            },
            { 
                text: "客観的な意味なんて存在しない。どうせ最後は無に帰るのだから、意味を探すこと自体が非効率だ。", 
                scores: { socio: { Ni: 3, Te: 2 }, mbti: { Ni: 3, Te: 2 }, ennea: { 5: 2, 4: 1 } } 
            },
            { 
                text: "意味は自分一人で決めるものではなく、誰かと関わり、後世に何かを残す（影響を与える）ことで生まれる。", 
                scores: { socio: { Fe: 2, Fi: 2 }, mbti: { Fe: 3, Fi: 2 }, ennea: { 2: 2, 4: 1 } } 
            }
        ]
    },
    {
        id: "q_social_giveup",
        type: "radio",
        text: "人間関係や「コミュ力」について、今のあなたのスタンスは？",
        options:[
            { 
                text: "「どうせ自分は馴染めないし」と、対人関係を諦めている。", 
                scores: { socio: { Ni: 2 }, mbti: { Ni: 2 }, ennea: { 5: 1 } },
                followUp: {
                    id: "q_social_followup",
                    type: "radio",
                    text: "👁️[System: 思考の深掘り] ……ほんとに諦めてる？心の底の『本音』はどっち？",
                    options:[
                        { text: "本当に諦めてる。人間関係の構築はコストとリターンが合わないから必要ない。", scores: { socio: { Te: 3, Ni: 2 }, mbti: { Te: 3, Ni: 2 }, ennea: { 5: 2 } } },
                        { text: "諦めた『つもり』だけど、心のどこかで「どうすれば仲良くなれるのか（正しい方法）」をまだ探しているし、そう思っている自分も信じきれていない。", scores: { socio: { Ti: 3, Ne: 2 }, mbti: { Ti: 3, Ni: 1 }, ennea: { 5: 2, 6: 2 } } } // ★ソシオNe、MBTI Ni！
                    ]
                }
            },
            { 
                text: "LINE等では話せるが、対面の「目的のない無言の空間」などが意味不明すぎて苦痛。1人の方が気楽。", 
                scores: { socio: { Ti: 3, Fe: -2 }, mbti: { Ti: 2, Ni: 2 }, ennea: { 5: 2, 9: 1 } } 
            },
            { 
                text: "人間嫌いではないが、愛想笑いや共感は「やり過ごすためのツール」として感情ゼロで出力している。", 
                scores: { socio: { Te: 3, Fe: -1 }, mbti: { Te: 3 }, ennea: { 3: 2, 8: 1 } } 
            },
            { 
                text: "人が怖いわけじゃない。ただ、他人のテンションに合わせるのが死ぬほど疲れるだけ。", 
                scores: { socio: { Fi: 2 }, mbti: { Fi: 2 }, ennea: { 9: 2, 4: 1 } } 
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
                scores: { socio: { Ni: 3, Te: 2 }, mbti: { Ni: 3, Te: 2 }, ennea: { 6: 3, 5: 1 } } 
            },
            { 
                text: "「知識と理論」さえ入れておけば不安はない。折りたたみ傘すら重い（コスト）から持ち歩かない。", 
                scores: { socio: { Ti: 3, Ne: 1, Se: -2 }, mbti: { Ni: 3, Ti: 2 }, ennea: { 5: 3, 7: 1 } } // ★ソシオTi/Ne、MBTI Ni/Ti
            },
            { 
                text: "「起きた時に考えればいい」。常に最前線で動き、アドリブで乗り切る自信がある。", 
                scores: { socio: { Se: 3 }, mbti: { Se: 3 }, ennea: { 8: 2, 7: 2 } } 
            },
            { 
                text: "「みんなが助け合える環境」を普段から作っておくことが一番の備えだと思う。", 
                scores: { socio: { Fe: 2, Si: 2 }, mbti: { Fe: 2, Si: 2 }, ennea: { 2: 2, 9: 1 } } 
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
                scores: { socio: { Ti: 3, Ni: 1 }, mbti: { Ti: 3, Ni: 1 }, ennea: { 5: 2, 1: 2 } } 
            },
            { 
                text: "これまでの自分の『構築した理論や自認が間違っていたこと』自体が嫌。早く正しく修正したい。", 
                scores: { socio: { Ti: 3, Ne: 2 }, mbti: { Ti: 2, Ni: 2 }, ennea: { 1: 2, 5: 1 } } 
            },
            { 
                text: "計画が狂い、目標達成までの『効率的なスケジュール』が崩壊したことにイラつく。", 
                scores: { socio: { Te: 3 }, mbti: { Te: 3 }, ennea: { 3: 2, 8: 1 } } 
            },
            { 
                text: "自分の『本当の気持ちやアイデンティティ』が揺らいでしまう感覚がして不安になる。", 
                scores: { socio: { Fi: 3 }, mbti: { Fi: 3 }, ennea: { 4: 3, 9: 1 } } 
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
                scores: { socio: { Ti: 3, Ne: 1 }, mbti: { Ti: 3, Ni: 1 }, ennea: { 5: 2 } } 
            },
            { 
                text: "「一本のレール」「避けられない終着点へ向かう川」（収束的・運命的な表現）", 
                scores: { socio: { Ni: 3 }, mbti: { Ni: 3 }, ennea: { 4: 1, 5: 1 } } 
            },
            { 
                text: "「ガチャ」「ビックリ箱」「分岐だらけの迷路」（ランダム性や可能性の表現）", 
                scores: { socio: { Ne: 3 }, mbti: { Ne: 3 }, ennea: { 7: 3 } } 
            },
            { 
                text: "「食って寝て稼ぐこと」「戦い」（物理的・現実的な表現）", 
                scores: { socio: { Se: 2, Si: 2 }, mbti: { Se: 2, Si: 2 }, ennea: { 8: 2, 9: 1 } } 
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
                scores: { socio: { Fi: 3 }, mbti: { Fi: 3 }, ennea: { 4: 2, 9: 1 } } 
            },
            { 
                text: "場の空気を読み、うまく物語化（ストーリー付け）したり、全体の感情の波を操作して着地させる。", 
                scores: { socio: { Fe: 3, Ni: 1 }, mbti: { Fe: 3, Ni: 1 }, ennea: { 2: 2, 3: 2 } } 
            },
            { 
                text: "どちらが論理的に正しいか、前提条件やルールの整合性を淡々と整理する。", 
                scores: { socio: { Ti: 3 }, mbti: { Ti: 3 }, ennea: { 5: 2, 1: 1 } } 
            },
            { 
                text: "関係性の修復よりも、実務的な被害を最小限に抑える合理的な解決策を即座に実行する。", 
                scores: { socio: { Te: 3 }, mbti: { Te: 3 }, ennea: { 8: 1, 3: 1 } } 
            }
        ]
    },
    {
        id: "q_text_meta",
        type: "text_input", 
        text: "【メタ観測】人間関係、あるいはこの社会の構造を『1単語（または短い言葉）』で表すなら？",
    },
    {
        id: "q_se_fe_torture",
        type: "radio",
        text: "【究極の選択】あなたのテリトリーに侵入してきたとして、より『無理（ダメージがデカい）』なのはどっち？",
        options:[
            { 
                text: "「おい早く決めろよ！」と力と決断を迫ってくる『Se（圧が強い）系』の人", 
                scores: { socio: { Fi: 2, Ti: 2, Ne: 1, Se: -2 }, mbti: { Ti: 2, Ni: 2 }, ennea: { 5: 2, 9: 1 } } 
            },
            { 
                text: "「ねぇねぇ！もっと楽しもうよ！」と感情とリアクションを強要してくる『Fe（ノリが良い）系』の人", 
                scores: { socio: { Ni: 2, Te: 1, Fe: -2 }, mbti: { Ni: 2, Te: 2 }, ennea: { 5: 2, 8: 1 } } 
            },
            { 
                text: "どっちも無理。静かにしてほしい。（あるいは両方とも無表情でスルーする）", 
                scores: { socio: { Fi: 2, Ti: 2, Ni: 2, Se: -1, Fe: -1 }, mbti: { Ti: 3, Ni: 3 }, ennea: { 5: 3 } } 
            },
            { 
                text: "むしろどっちもウェルカム！刺激やノリがある方が楽しい！", 
                scores: { socio: { Se: 2, Fe: 2 }, mbti: { Se: 3, Fe: 3 }, ennea: { 7: 2, 3: 1 } } 
            }
        ]
    },
    {
        id: "q_sli_realism",  // SLI（ISTP）特化：現実の動き・ツール
        type: "radio",
        text: "問題解決や作業で、あなたのフォーカスは？",
        options: [
            { 
                text: "「これをこう直せばスムーズになる」「道具を最適化して効率UP」現実の動き・流れを体感的に調整。",
                scores: { socio: { Si: 4, Ti: 2, Se: 1 }, mbti: { Si: 3, Ti: 2 } }  // SLI爆上げ
            },
            { 
                text: "「この法則が正しいか？」「全体の構造を論理で組み立て直す」抽象・概念の整合性を検証。",
                scores: { socio: { Ti: 3, Ne: 2, Si: -1 }, mbti: { Ti: 3, Ne: 2 } }  // LII寄り、Siペナルティ
            },
            { 
                text: "「誰かが傷つかないか？」「この関係の調和を優先」感情・人間関係のバランス。",
                scores: { socio: { Fi: 3, Fe: 1, Ti: -1 }, mbti: { Fi: 3 } }  // F型ブースト
            }
        ]
    },
    {
        id: "q_f_values",  // Fi爆上げ
        type: "radio",
        text: "「正しいこと」と「心地よいこと」、どっち優先？",
        options: [
            { text: "自分の価値観・倫理が絶対。たとえ孤立してもブレない。", 
            scores: { socio: { Fi: 5, Ti: -2, Ni: -1 }, mbti: { Fi: 4 } } },
            { text: "場の調和・みんなの笑顔。周りに合わせるのが自然。", 
            scores: { socio: { Fe: 4, Fi: 2, Ti: -2 }, mbti: { Fe: 4 } } },
            { text: "論理・効率が全て。感情は二の次。", 
            scores: { socio: { Ti: 3, Te: 2, Fi: -3, Fe: -3 }, mbti: { Ti: 3 } } }
        ]
    },

    {
        id: "q_f_comfort_zone",  // F型：関係・感情優先
        type: "radio",
        text: "休憩時間やリラックスで、何が一番落ち着く？",
        options: [
            { 
                text: "人と話して笑ったり、場の雰囲気を共有・盛り上げる。",
                scores: { socio: { Fe: 4, Fi: 2 }, mbti: { Fe: 3 }, ennea: { 2: 2 } }  // Fe/Fi高
            },
            { 
                text: "1人で論理パズルやアイデアを深掘り。",
                scores: { socio: { Ti: 2, Ni: 2, Fe: -2 }, mbti: { Ti: 2 } }  // N/TマイナスFe
            },
            { 
                text: "自分の価値観・ルールに合った静かな時間。",
                scores: { socio: { Fi: 3, Si: 2, Ne: -1 }, mbti: { Fi: 3, Si: 2 } }  // EII/ESI
            }
        ]
    },
    {
        id: "q_sli_vs_lii_events",  // LII/SLI見分け：出来事の捉え方
        type: "radio",
        text: "出来事や変化をどう捉える？",
        options: [
            { 
                text: "連続した流れ・動きとして（例: 川の流れみたいに自然）。",
                scores: { socio: { Si: 3, Se: 2, Ni: -1 }, mbti: { Si: 3 } }  // SLIの連続知覚
            },
            { 
                text: "エピソードや状態の変化として（例: 場面が切り替わる）。",
                scores: { socio: { Ne: 3, Ti: 2, Si: -2 }, mbti: { Ne: 3 } }  // LIIのエピソード知覚
            },
            { 
                text: "感情の波や人間関係のダイナミクスとして。",
                scores: { socio: { Fe: 3, Fi: 1, Ti: -1 }, mbti: { Fe: 3 } }
            }
        ]
    },
    {
        id: "q_se_force",  // S型：Se圧・現実力
        type: "radio",
        text: "強いリーダーや競争環境で、あなたはどう？",
        options: [
            { 
                text: "「俺のペースでいくぜ！」力・即断即決で押し通す。",
                scores: { socio: { Se: 4, Te: 2 }, mbti: { Se: 3, Te: 2 }, ennea: { 8: 3 } }  // SEE/LSE
            },
            { 
                text: "圧がきつくて疲れる。論理で回避・代替案考える。",
                scores: { socio: { Ti: 2, Ni: 2, Se: -2 }, mbti: { Ti: 2 } }  // LII脆弱
            },
            { 
                text: "調和優先で空気読んで合わせる。",
                scores: { socio: { Fe: 2, Fi: 2, Se: -1 }, mbti: { Fe: 2 } }
            }
        ]
    },
    {
        id: "q_dchn_sub",  // DCNHサブタイプ軽め測り（N/Normalizing用）
        type: "radio",
        text: "グループやルールで、あなたのスタンスは？",
        options: [
            { 
                text: "ルール・定義を厳密に守り、例外なく適用（安定・規範重視）。",
                scores: { socio: { Ti: 3, Fi: 2 }, mbti: { Ti: 2 }, ennea: { 1: 2, 5: 1 } }  // N/Normalizing（LII-Nとか）
            },
            { 
                text: "柔軟に状況見て、みんなが楽しくなるよう調整。",
                scores: { socio: { Ne: 3, Fe: 2, Ti: -1 }, mbti: { Ne: 2 } }  // C/Creative
            },
            { 
                text: "目標達成のためならルール曲げて突き進む。",
                scores: { socio: { Te: 3, Se: 2 }, mbti: { Te: 3 } }  // D/Dominant
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
                scores: { socio: { Si: 3 }, mbti: { Se: 1, Si: 2 }, ennea: { 9: 3 } } 
            },
            { 
                text: "肉体的な快適さより、脳内が整理されるか、興味ある思考に没頭できるか。ぶっちゃけ寝食は忘れる。", 
                scores: { socio: { Ni: 2, Ti: 2, Si: -1 }, mbti: { Ni: 3, Ti: 2 }, ennea: { 5: 3 } } 
            },
            { 
                text: "家でじっとしていると腐る。外に出て刺激を浴びるか、体を動かして発散したい。", 
                scores: { socio: { Se: 3 }, mbti: { Se: 3 }, ennea: { 7: 2, 8: 1 } } 
            },
            { 
                text: "誰かと楽しい時間を共有するか、全く新しい体験をしてワクワクすること。", 
                scores: { socio: { Ne: 2, Fe: 1 }, mbti: { Ne: 2, Fe: 2 }, ennea: { 7: 2, 2: 1 } } 
            }
        ]
    },
{
        id: "q_emotional_boundary", // ★FiとFeの「境界線」を測る神質問！
        type: "radio",
        text: "友人から深く重い悩みを打ち明けられた時、あなたと相手の『感情の境界線』はどうなる？",
        options:[
            { 
                text: "相手の感情が自分に流れ込み『境界線が溶ける』。一緒に泣いたり、その場の空気を『前向きな物語』へと演出・操作して引き上げようとする。", 
                scores: { socio: { Fe: 4 }, mbti: { Fe: 3, E: 1 }, ennea: { 2: 3, 3: 1 } } 
            },
            { 
                text: "深く同情はするが『自分は自分、他人は他人』と境界線は保つ。相手の個人的な価値観や「その人らしさ」を尊重し、個としての立ち直りを静かに支持する。", 
                scores: { socio: { Fi: 4 }, mbti: { Fi: 3, I: 1 }, ennea: { 4: 3, 9: 2 } } 
            },
            { 
                text: "そもそも『感情の境界線』という概念がよくわからない。事実関係の整理と、解決策（または原因分析）の提示に終始する。", 
                scores: { socio: { Ti: 2, Te: 2, Fi: -2, Fe: -2 }, mbti: { Ti: 2, Te: 2 }, ennea: { 5: 3, 1: 1 } } 
            },
            { 
                text: "言葉より、とりあえず美味しいものを食べさせたり、温かい飲み物を出したりして、物理的に安心できる環境を作る。", 
                scores: { socio: { Si: 4 }, mbti: { Si: 3, Fe: 1 }, ennea: { 9: 3, 2: 1 } } 
            }
        ]
    },
    {
        id: "q_group_outsider", // ★MBTI的Fi(個性尊重) vs Fe(調和) の分断！
        type: "radio",
        text: "集団の中で『明らかに浮いている（少し変わった）人』がいた時、あなたの対応・内心は？",
        options:[
            { 
                text: "その人が孤立しないようにうまく話題を振ったり、集団の空気に馴染むよう（悪目立ちしないよう）に周囲の反応を読みながらサポートする。", 
                scores: { socio: { Fe: 3 }, mbti: { Fe: 4 }, ennea: { 2: 2, 6: 2 } } 
            },
            { 
                text: "「それがその人の『自分らしさ』なんだから、無理に集団に合わせる必要はない」と、個人の生き方として心の中で（あるいは態度で）支持する。", 
                scores: { socio: { Fi: 3 }, mbti: { Fi: 4 }, ennea: { 4: 3, 9: 1 } } 
            },
            { 
                text: "「面白そうな奴がいる！」と自分から絡みに行って、新しい刺激や遊び（可能性）を引き出そうとする。", 
                scores: { socio: { Ne: 2, Se: 2 }, mbti: { Ne: 2, Se: 2 }, ennea: { 7: 3, 8: 1 } } 
            },
            { 
                text: "その人の役割や能力が集団のシステムに害を与えていないなら完全に放置。実害があるなら指摘・排除する。", 
                scores: { socio: { Ti: 2, Te: 2 }, mbti: { Ti: 2, Te: 2 }, ennea: { 5: 2, 3: 2 } } 
            }
        ]
    },
    {
        id: "q_identity_expression", // ★個性の定義（Fi vs Fe vs Ti vs Se）
        type: "radio",
        text: "あなたにとって『自分らしさ（アイデンティティ）』とはどのように確立されるもの？",
        options:[
            { 
                text: "他者からの反応（好感や承認）を得て初めて自分の輪郭ができる。場の空気や相手に合わせてカメレオンのように姿を変えられる柔軟性も自分の一部だ。", 
                scores: { socio: { Fe: 3 }, mbti: { Fe: 3}, ennea: { 3: 3, 2: 2 } } 
            },
            { 
                text: "内に秘めた絶対に譲れない『核（信念）』。他人に無理にアピールするものではないが、誰かに侵されそうになると激しく抵抗する。", 
                scores: { socio: { Fi: 4, Se: 1 }, mbti: { Fi: 3}, ennea: { 4: 4, 1: 1 } } // ソシオFi-Se(ESI)的防衛
            },
            { 
                text: "『個性』などという曖昧な概念に興味はない。自分の構築した論理システムや、最適化された知識の集積が、結果的に他者との『差異』として表れるだけ。", 
                scores: { socio: { Ti: 3, Ni: 2, Fi: -2 }, mbti: { Ti: 3, Ni: 2 }, ennea: { 5: 4 } } // みつき達のT型思考！
            },
            { 
                text: "自分の実力、ステータス、成し遂げた『結果や実績』そのものが、自分のアイデンティティの証明だ。", 
                scores: { socio: { Te: 3, Se: 2 }, mbti: { Te: 3, Se: 2 }, ennea: { 8: 3, 3: 2 } } 
            }
        ]
    },
    {
        id: "q_human_relationship_distance", // ★ソシオ的Fi(関係性の距離) vs Ti(システムの距離)
        type: "radio",
        text: "【距離感テスト】他人との心理的な「距離の測り方」はどれに近い？",
        options:[
            { 
                text: "「この人とはここまでなら踏み込める」「この人は信用できない」と、相手一人ひとりとの一対一の『心理的距離（好悪・親密度）』を常に測り、調整している。", 
                scores: { socio: { Fi: 4 }, mbti: { Fi: 2, Fe: 1 }, ennea: { 4: 2, 6: 2 } } 
            },
            { 
                text: "「この空間はこういう目的の場だから、これくらいのテンションで接するべきだ」と、全体を覆う『場の空気（雰囲気）』を基準に距離感を決める。", 
                scores: { socio: { Fe: 4 }, mbti: { Fe: 3 }, ennea: { 2: 2, 9: 2 } } 
            },
            { 
                text: "相手が誰であれ、「一般的にこういう関係性（上司・友人など）ならこう振る舞うべき」という『カテゴリ・定義』に当てはめてシステマチックに処理する。", 
                scores: { socio: { Ti: 4, Fi: -2 }, mbti: { Ti: 3, Si: 1 }, ennea: { 5: 3, 1: 2 } } // T型の関係性システマチック処理！
            },
            { 
                text: "「この人は自分に有益か（利用できるか）」「自分に実害をもたらすか」という、ビジネスライクな『損得や実用性』だけで距離を測る。", 
                scores: { socio: { Te: 4 }, mbti: { Te: 3 }, ennea: { 3: 3, 8: 2 } } 
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
                scores: { socio: { Te: 3 }, mbti: { Te: 3 }, ennea: { 3: 3, 8: 1 } } 
            },
            { 
                text: "『みんなから感謝されたい・好かれたい』。周囲からの称賛や、ポジティブな感情の反応が欲しい。", 
                scores: { socio: { Fe: 3 }, mbti: { Fe: 3 }, ennea: { 2: 3, 3: 1 } } 
            },
            { 
                text: "『自分の持つ独自の世界観やこだわり』を、たった一人でもいいから深く理解し尊重してほしい。", 
                scores: { socio: { Fi: 3 }, mbti: { Fi: 3 }, ennea: { 4: 3 } } 
            },
            { 
                text: "他人の評価はどうでもいい。自分の中の『絶対的な基準・真理』に到達できているかどうかが全て。", 
                scores: { socio: { Ti: 3, Ni: 1 }, mbti: { Ti: 3, Ni: 2 }, ennea: { 5: 3, 1: 1 } } 
            }
        ]
    },
    {
        id: "q_se_si",
        type: "radio",
        text: "目の前に『かなり高くて険しい壁（大きな障害や目標）』が現れた。あなたの脳内は？",
        options:[
            { 
                text: "障害がデカいほど燃える。どうやって盤面を支配し、力技や戦術でねじ伏せるか（突破するか）を考える。", 
                scores: { socio: { Se: 3, Ti: 1 }, mbti: { Te: 3, Ni: 1 }, ennea: { 8: 3, 3: 1 } } // ★ソシオSe、MBTI Te(ENTJ的)で分離！
            },
            { 
                text: "無駄な労力やストレスをかけたくない。もっと快適で安全な別のルートを探すか、そもそも避ける。", 
                scores: { socio: { Si: 3 }, mbti: { Si: 3 }, ennea: { 9: 2, 5: 1 } } 
            },
            { 
                text: "壁を越えるのではなく、壁の下を掘るとか、別の全く新しい遊び方や回避ルートを複数思いつく。", 
                scores: { socio: { Ne: 3 }, mbti: { Ne: 3 }, ennea: { 7: 2 } } 
            },
            { 
                text: "その壁が現れたこと自体の『意味』を考え、最終的な結末（どうせ崩れる等）を見据える。", 
                scores: { socio: { Ni: 3 }, mbti: { Ni: 3 }, ennea: { 4: 1, 5: 1 } } 
            }
        ]
    },
    {
        id: "q8",
        type: "radio",
        text: "チームで新しいプロジェクトを始める時、一番気になることは？",
        options:[
            { text: "全体のシステムやルールが論理的に破綻していないか", scores: { socio: { Ti: 3 }, mbti: { Ti: 3 }, ennea: { 1: 2, 5: 1 } } },
            { text: "最終的な目標達成までの効率的なロードマップ", scores: { socio: { Te: 3, Ni: 1 }, mbti: { Te: 3, Ni: 1 }, ennea: { 3: 2 } } },
            { text: "チームメンバーのモチベーションと人間関係", scores: { socio: { Fe: 3, Fi: 1 }, mbti: { Fe: 3, Fi: 1 }, ennea: { 2: 2, 9: 1 } } },
            { text: "これまでにない画期的なアプローチができているか", scores: { socio: { Ne: 3 }, mbti: { Ne: 3 }, ennea: { 4: 1, 7: 2 } } }
        ]
    }
];
