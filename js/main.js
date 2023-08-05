// 待機関数
function wait(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}


// 文字列の数を返す関数　半角文字数は1文字、全角文字数は2文字として考える。
function count(str) {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
    (str[i].match(/[ -~]/)) ? len += 1 : len += 2;
    }
    return len;
}

// メッセージ待機用の配列
message_array = [];

// メッセージを追加する関数　message:メッセージ内容の文字列, from:「enemy」か「me」を文字列で書いてください。enemyと書いた場合は相手側となり、meと書いた場合は自分側のメッセージとなります。
async function add_message() {
    while (message_array.length == 0) {
        await wait(100);
    }
    let message = message_array[0][0]
    let from = message_array[0][1]
    message_array.shift();
    // メッセージ初期表示時間（ランダム）
    var items = [0.5, 1, 1.5];
    //最大値は配列の「要素数」にする
    var random = Math.floor( Math.random() * items.length );
    await wait(items[random]*1000);

    // 初期表示開始
    let div_tag = document.createElement("div");
    if (from == "me"){
        div_tag.className = "message_block message_me";
    }else {
        div_tag.className = "message_block";
    }
    // 人のアイコン作成
    let parson_tag = document.createElement("div");
    parson_tag.className = "person_mark";
    let parson_head = document.createElement("span");
    parson_head.className = "person_mark_head";
    let parson_body = document.createElement("span");
    parson_body.className = "person_mark_body";
    parson_tag.appendChild(parson_head);
    parson_tag.appendChild(parson_body);
    div_tag.appendChild(parson_tag);
    // メッセージ作成
    let p_tag = document.createElement("p");
    p_tag.className = "message_content loading_anime";
    p_tag.innerHTML = "<span></span><span></span><span></span>";
    div_tag.appendChild(p_tag);

    document.getElementById("bulletin_board").appendChild(div_tag);

    if (from == "enemy"){
        await wait(30*count(message));

    }
    // メッセージ内容追加
    div_tag.getElementsByClassName("message_content")[0].className = "message_content";
    div_tag.getElementsByClassName("message_content")[0].textContent = message;
    // 時間追加
    var now_time = moment();
    let posted_date_tag = document.createElement("p");
    posted_date_tag.className = "posted_date";
    posted_date_tag.textContent = now_time.format('YYYY/MM/DD HH:mm');
    div_tag.appendChild(posted_date_tag);
    add_message();

}

