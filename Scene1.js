//===========================================//
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
//===========================================//
    var game = new Phaser.Game(config);
//===========================================//

    //Joueur principal
    var player;

    //Décorations
    var waters;

    //Gameplay
    var fishSpawnPointX = 850;
    var fishSpawnPointY_a = 467;
    var fishSpawnPointY_z = 497;
    var fishSpawnPointY_e = 527;
    var fishSpawnPointY_r = 557;

    var hook;
    var isFishInHook = false;

    var fishingLines;
    var fish;
    var f;
    var fishes;
    var f2;
    var f3;

    //Inputs
    var key_A;
    var key_Z;
    var key_E;
    var key_R;

    
    var once_a = true;
    var once_z = true;
    var once_e = true;
    var once_r = true;

    var Key_A_isPressed = false;
    var Key_Z_isPressed = false;
    var Key_E_isPressed = false;
    var Key_R_isPressed = false;

    


    function preload ()
    {
        //Chargement des assets
        this.load.image('Maison', 'assets/Objects/Fishing_hut.png');
        this.load.image('fisherman', 'assets/Fisherman/Fisherman.png');
        this.load.image('Background', 'assets/Autres/background.png');
        this.load.image('Water', 'assets/Objects/Water_Simple.png');
        this.load.image('Water2', 'assets/Objects/Water_Simple_3.png');
        this.load.image('herb1', 'assets/Objects/Grass1.png');
        this.load.image('herb2', 'assets/Objects/Grass2.png');
        this.load.image('herb3', 'assets/Objects/Grass3.png');
        this.load.image('herb4', 'assets/Objects/Grass4.png');
        this.load.image('Pillar1', 'assets/Objects/Pillar_1.png');
        this.load.image('Pillar2', 'assets/Objects/Pillar_2.png');

        //Poissons
        this.load.image('fish_1', 'assets/Objects/Catch/3_solo_1.png');
        this.load.image('fish_6', 'assets/Objects/Catch/6_solo.png');

        //Lignes de pêche
        this.load.image('line_a', 'assets/Objects/line_a.png');
        this.load.image('line_z', 'assets/Objects/line_z.png');
        this.load.image('line_e', 'assets/Objects/line_e.png');
        this.load.image('line_r', 'assets/Objects/line_r.png');
        this.load.image('hook', 'assets/Objects/hook.png');

        //Chargement des animations
        this.load.spritesheet('player_idle', 'assets/Fisherman/Fisherman_idle.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('player_fishing', 'assets/Fisherman/Fisherman_fish.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('fish_1_anim', 'assets/Objects/Catch/3_solo.png', { frameWidth: 20, frameHeight: 12 });
        this.load.spritesheet('fish_6_anim', 'assets/Objects/Catch/6_anim.png', { frameWidth: 54, frameHeight: 22 });
        
    }

    function create ()
    {
        //Création de l'arrière plan
        this.add.image(400, 300, 'Background');

        //Création de la maison
        this.add.image(100, 420, 'Maison');

        //Boucle pour afficher l'eau
        waters = this.physics.add.group({
            key: 'Water2',
            repeat: 3,
            setXY: { x: 5, y: 520, stepX: 260 }});
       

        //Ajout du joueur
        player = this.physics.add.sprite(190, 398, 'fisherman');

        this.anims.create({
            key: 'fish_1_move',
            frames: this.anims.generateFrameNumbers('fish_1_anim', { start: 0, end: 1 }),
            frameRate: 6,
            repeat: -1
            });
        this.anims.create({
            key: 'fish_6_move',
            frames: this.anims.generateFrameNumbers('fish_6_anim', { start: 0, end: 1 }),
            frameRate: 6,
            repeat: -1
            });

        //Création de l'animation d'idle du joueur
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
            });

        this.anims.create({
            key: 'fishing',
            frames: this.anims.generateFrameNumbers('player_fishing', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
            });

        //console.log("your code");
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        //Décorations
        var y = 590;
        this.add.image(30, y, 'herb1');
        
        this.add.image(150, y, 'herb2');
        this.add.image(175, y, 'herb3');
        this.add.image(250, y, 'herb4');
        this.add.image(300, y, 'herb2');
        this.add.image(315, y, 'herb4');
        this.add.image(340, y, 'herb3');
        this.add.image(380, y, 'herb1');
        this.add.image(420, y, 'herb4');
        this.add.image(450, y, 'herb2');
        this.add.image(490, y, 'herb1');
        this.add.image(530, y, 'herb3');
        this.add.image(560, y, 'herb4');
        this.add.image(620, y, 'herb2');
        this.add.image(660, y, 'herb1');
        this.add.image(700, y, 'herb3');
        this.add.image(760, y, 'herb3');
        //Pillars
        this.add.image(165,473, 'Pillar2');
        this.add.image(192,473, 'Pillar2');
        this.add.image(165,505, 'Pillar2');
        this.add.image(192,505, 'Pillar2');
        this.add.image(165,537, 'Pillar2');
        this.add.image(192,537, 'Pillar2');
        this.add.image(165,569, 'Pillar2');
        this.add.image(192,569, 'Pillar2');
        //
        this.add.image(131,473, 'Pillar2');
        this.add.image(102,473, 'Pillar2');
        this.add.image(131,505, 'Pillar2');
        this.add.image(102,505, 'Pillar2');
        this.add.image(131,537, 'Pillar2');
        this.add.image(102,537, 'Pillar2');
        this.add.image(131,569, 'Pillar2');
        this.add.image(102,569, 'Pillar2');
        //
        this.add.image(72,473, 'Pillar2');
        this.add.image(72,505, 'Pillar2');
        this.add.image(72,537, 'Pillar2');
        this.add.image(72,569, 'Pillar2');
        //
        this.add.image(9,473, 'Pillar2');
        this.add.image(9,505, 'Pillar2');
        this.add.image(9,537, 'Pillar2');
        this.add.image(9,569, 'Pillar2');
        this.add.image(100, 590, 'herb1');

        key_A = this.input.keyboard.addKey('A');
        key_Z = this.input.keyboard.addKey('Z');
        key_E = this.input.keyboard.addKey('E');
        key_R = this.input.keyboard.addKey('R');

        //console.log(key_A);
        fishingLines = this.physics.add.staticGroup();
        
        hook = this.physics.add.sprite(-200,-200, 'hook');

        //Groupe ou les poissons apparaitront
        fishes = this.physics.add.group();

        fishes.create(fishSpawnPointX, fishSpawnPointY_a, 'fish_1').setScale(1.5);
        fishes.create(fishSpawnPointX, fishSpawnPointY_z, 'fish_1').setScale(1.5);
        fishes.create(fishSpawnPointX, fishSpawnPointY_e, 'fish_6').setScale(0.8);
        fishes.create(fishSpawnPointX, fishSpawnPointY_r, 'fish_1').setScale(1.5);

        
        fishes.children.entries[2].name= "Marcus";

        console.log(fishes.children.entries[0]);

       for (var i = 0; i < fishes.children.entries.length; i++) 
        {
            if(fishes.children.entries[i].y == fishSpawnPointY_a)
                fishes.children.entries[y].name= "Paul"; 
            if(fishes.children.entries[i].y == fishSpawnPointY_z)
                fishes.children.entries[y].name= "Britney"; 
            if(fishes.children.entries[i].y == fishSpawnPointY_e)
                fishes.children.entries[y].name= "Marcus"; 
            if(fishes.children.entries[i].y == fishSpawnPointY_r)
                fishes.children.entries[y].name= "Kimberly"; 
        }

        this.physics.add.overlap(hook, fishes, FishIsInHook, null, this);
        //console.log(fishes.children.entries.length);


        

    }

    function HandleAnimation(fish)
    {
        if(fish.name == "Paul")
            fish.anims.play('fish_1_move', true);
        if(fish.name == "Marcus")
            fish.anims.play('fish_6_move', true);
    }


    // var decreaseText;
    // function TestFunc() {
    //     console.log(testf.x);
    // }

    function update ()
    {
        //1s 0 0.835= 50 unit
        //1s à 1.67 = 100 unit
        //1s à 3.34 = 200 unit
        //testf.x += 0.835;

        //if(testf.x >= 500 && a)
        //{
            //console.log(testf.x);
            //decreaseText = this.time.addEvent({ delay: 1000, callback: TestFunc, callbackScope: this, repeat: 0});
            //a = false;
        //}


        for (var i = 0; i < fishes.children.entries.length; i++) 
        {
            MoveFish(fishes.children.entries[i], -3);
            //fishes.children.entries[i].anims.play('fish_1_move', true);
            HandleAnimation(fishes.children.entries[i]);
        }

        

        //Animations du joueur
        if(Key_A_isPressed || Key_E_isPressed || Key_R_isPressed || Key_Z_isPressed)
        {
            player.anims.play('fishing', true);
        }
        else
        {
            player.anims.play('idle', true);
        }

        //Est appelé qu'une fois
        //Key -> A
        if(Phaser.Input.Keyboard.JustDown(key_A))
            Key_A_isPressed = true;
        if(Phaser.Input.Keyboard.JustUp(key_A))
            Key_A_isPressed = false;

        //Key -> Z
        if(Phaser.Input.Keyboard.JustDown(key_Z))
            Key_Z_isPressed = true;
        if(Phaser.Input.Keyboard.JustUp(key_Z))
            Key_Z_isPressed = false;

        //Key -> E
        if(Phaser.Input.Keyboard.JustDown(key_E))
            Key_E_isPressed = true;
        if(Phaser.Input.Keyboard.JustUp(key_E))
            Key_E_isPressed = false;

        //Key -> R
        if(Phaser.Input.Keyboard.JustDown(key_R))
            Key_R_isPressed = true;
        if(Phaser.Input.Keyboard.JustUp(key_R))
            Key_R_isPressed = false;

//===========================================================================//
        if(Key_A_isPressed && once_a == true)
        {
            fishingLines.create(209, 495, 'line_a');
            SpawnHook(209, 460);
            once_a = false;
        }
        if(!Key_A_isPressed && once_a == false)
        {
            fishingLines.children.entries[0].destroy();
            CheckIfHasFish();
            DispawnHook();
            once_a = true;
        }
        //---------------------------------------------------
        if(Key_Z_isPressed && once_z == true)
        {
            fishingLines.create(209, 495, 'line_z');
            SpawnHook(209, 490);
            once_z = false;
        }
        if(!Key_Z_isPressed && once_z == false)
        {
            fishingLines.children.entries[0].destroy();
            CheckIfHasFish();
            DispawnHook();
            once_z = true;
        }
        //---------------------------------------------------
        if(Key_E_isPressed && once_e == true)
        {
            fishingLines.create(209, 495, 'line_e');
            SpawnHook(209, 520);
            once_e = false;
        }
        if(!Key_E_isPressed && once_e == false)
        {
            fishingLines.children.entries[0].destroy();
            CheckIfHasFish();
            DispawnHook();
            once_e = true;
        }
        //---------------------------------------------------
        if(Key_R_isPressed && once_r == true)
        {
            fishingLines.create(209, 495, 'line_r');
            SpawnHook(209, 555);
            once_r = false;
        }
        if(!Key_R_isPressed && once_r == false)
        {
            fishingLines.children.entries[0].destroy();
            CheckIfHasFish();
            DispawnHook();
            once_r = true;
        }

        isFishInHook = this.physics.overlap(hook, fish);
    }

var currentFish;

function FishIsInHook(hook, fish)
{
    currentFish = fish;
}

function CheckIfHasFish()
{
    if(currentFish)
        currentFish.disableBody(true, true);
}
    
function SpawnHook(x, y)
{
    hook.x = x;
    hook.y = y;
}
function DispawnHook()
{
    hook.x = -200;
    hook.y = -200;
}

function MoveFish(fish, speed)
{
    fish.x += speed;
    if(fish.x < -5)
    {
        fish.x = 850;
    }
}