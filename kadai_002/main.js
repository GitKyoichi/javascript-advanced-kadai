// 画面に表示する文字列
let untyped = '';
let typed = '';
let score = 0;
let tcnt = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typcount = document.getElementById('typcount');

// 複数のテキストを格納する配列
const textLists = [
    'Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
    'I am Japanese','Let it be','Samurai',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android',
    'programming'
  ];

// ランダムなテキストを表示
const createText = () =>{
    typed = '';
    typedfield.textContent = typed;

    // 配列のインデックス数からランダムな数値を生成する
    let random = Math.floor(Math.random() * textLists.length);

    // 配列からランダムにテキストを取得し画面に表示する
    untyped = textLists[random];
    untypedfield.textContent = untyped;
    // タイプ数初期化
    tcnt = 0;
    typcount.textContent = tcnt;
};

// キー入力の判定
const keyPress = e => {
    // 誤タイプ
    if(e.key !== untyped.substring(0,1)) {
        wrap.classList.add('mistyped');
        // 100ms後に背景色をもとに戻す
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);
        return;
    }

    // 正タイプ
    score++;
    tcnt++;                         // タイプ数更新
    typcount.textContent = tcnt;    // タイプ数表示
    typed += untyped.substring(0,1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    // テキストがなくなったら新しいテキストを表示
    if(untyped === '') {
        createText();
    }
};

//　タイピングスキルのランク判定
const rankCheck = score => {
    // ランクメッセージ
    let text = '';
    // スコアに応じて異なるメッセージを格納
    if(score < 100) {
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    }
    else if(score < 200) {
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
    }
    else if(score < 300) {
        text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
    }
    else if(score >= 300) {
        text = `あなたのランクはSです。\nおめでとうございます!`;
    }

    return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
    clearInterval(id);
    // タイムアップ表示
    untyped = 'タイムアップ!';
    untypedfield.textContent = untyped;
    typed ='';
    typedfield.textContent = typed;

    setTimeout(() => {
        const result = confirm(rankCheck(score));
        // OKボタンをクリックされたらリロードする
        if(result == true) {
            window.location.reload();
        }
    },10);
    
    
};

// カウントダウンタイマー
const timer = () => {
    let time = count.textContent;
    const id = setInterval(() => {
        // カウントダウンする
        time--;
        count.textContent = time;
        // カウントがゼロになったらタイマーを停止する
        if(time <= 0) {
            gameOver(id);
        }
    }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {
    // カウントダウンタイマーを開始する
    timer();
    // ランダムなテキストを表示する
    createText();

    // スタートボタンを非表示にする
    start.style.display = 'none';

    // キーボードのイベント処理
    document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';
