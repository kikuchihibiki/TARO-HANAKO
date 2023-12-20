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

this.physics.add.overlap(taro, staticGroup, collectFruits, null, this);
        function collectFruits(p,apple){  
            this.physics.pause();
        }
this.physics.add.overlap(hanako, staticGroup, collectFruits, null, this);
        function collectFruits(p,apple){  
            this.physics.pause();
        }
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