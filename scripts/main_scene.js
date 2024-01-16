// 他のJSファイルから呼び出された場合はシーンを返す
class MainScene extends Phaser.Scene {
    // コンストラクタ
    constructor() {
        // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
        super('MainScene');
    }
    // シーンの事前読み込み処理
    preload() {
        // 画像の読み込み(使用する時の名前, パス)
       this.load.image('background', 'assets/background.jpg');
       this.load.image('taro', 'assets/taro.png');
       this.load.image('hanako', 'assets/hanako.png');
       this.load.image('apple', 'assets/apple.png');
       this.load.image('orange', 'assets/orange.png');
   }
   // シーン初期化処理
   create() {
    // 単体画像をシーンに追加(X座標,Y座標,画像名)
   this.add.image(400, 300, 'background');
   const taro = this.physics.add.sprite(50, 50, 'taro')
   const hanako = this.physics.add.sprite(400, 400, 'hanako')
   this.taro = taro
   this.hanako = hanako
   this.fruits = 0;
   this._timeCounter = 0;  
        //残り時間
        this._leftTime = 10;   
        //文字列
        this._leftTimeText = this.add.text(300, 30, 'Time: ' + this._leftTime, { fontSize: '28px', fill: '#FFF' }); //時間表示
        // カウントダウンタイマーを稼働させるか判定するフラグ
        this.countdounTimer = true;
let staticGroup = this.physics.add.staticGroup();
for (let i = 0; i < 6; i++) {
    let randx = Phaser.Math.Between(25, 775);
    let randy = Phaser.Math.Between(25, 425);
    staticGroup.create(randx, randy, 'apple');
}
for (let i = 0; i < 6; i++) {
    let randxx = Phaser.Math.Between(25, 775);
    let randyy = Phaser.Math.Between(25, 425);
    staticGroup.create(randxx, randyy, 'orange');
}
this.physics.add.overlap(hanako, staticGroup, this.collectFruits, null, this);
// taroのゲーム終了処理
this.physics.add.overlap(taro, staticGroup, collectFruits, null, this);
        function collectFruits(){  
            this.physics.pause();
        }
// this.physics.add.overlap(hanako, staticGroup, collectFruits, null, this);
//         function collectFruits(){  
//             this.physics.pause();
//         }

   }
   collectFruits(hanako, fruit) {
    // 敵を消す
    fruit.destroy();
    // カウンターを増やす
    this.fruits++;
    // カウンターが10になったらゲームを停止
    if (this.fruits === 10) {
        this.add.text(400, 200, 'CLEAR', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.physics.pause();
    }
}
countdown(delta){
    // 毎フレーム事にタイマーを更新
    this._timeCounter += delta;
    // _timeCounterが1000になった1秒
    if(this._timeCounter > 1000) {
        // 1000ミリ秒経過したのでカウンターをリセット
        this._timeCounter = 0;
        // 残り時間を減らす
        this._leftTime --;
        // テキストを更新する
        this._leftTimeText.setText('Time: ' + this._leftTime);
    }
    if(this._leftTime <= 0) {
        // this._leftTime=30;
        this.quitGame();
    }
}
quitGame(){
    this.add.text(D_WIDTH/3,D_HEIGHT*1/3, 'Game Over!', { fontSize: '32px', fill: '#CDC' });
     // 色合いを変える
    this.player1.setTint(0x999999);
    this.player2.setTint(0xaaaaaa);
      //物理エンジンを止める
    this.physics.pause();
    //カウントダウンタイマーを止めるためにフラグをfalseにする
    this.countdounTimer = false;
    return;
}
     // 毎フレーム実行される繰り返し処理
        update() {
            // キーボードの情報を取得
            let cursors = this.input.keyboard.createCursorKeys();
            if(cursors.up.isDown){
                console.log("Up!!");
                this.taro.setVelocityY(-300);// 上方向の速度を設定
                this.hanako.setVelocityY(300);// 上方向の速度を設定
            } else if(cursors.down.isDown){
                console.log("down!!");
                this.taro.setVelocityY(300);// 下方向の速度を設定
                this.hanako.setVelocityY(-300);// 下方向の速度を設定
            }else if(cursors.left.isDown){
                console.log("Left");
                this.taro.setVelocityX(-300);// 左方向の速度を設定
                this.hanako.setVelocityX(300);// 左方向の速度を設定
            }else if(cursors.right.isDown){
                console.log("Right!!");
                this.taro.setVelocityX(300);// 右方向の速度を設定
                this.hanako.setVelocityX(-300);// 右方向の速度を設定
            }else{
                this.taro.setVelocityX(0);// 横方向の速度を0
                this.taro.setVelocityY(0);// 縦方向の速度を
                this.hanako.setVelocityX(0);// 横方向の速度を0
                this.hanako.setVelocityY(0);// 縦方向の速度を0
            }
            
    }
}