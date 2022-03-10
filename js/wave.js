window.addEventListener('DOMContentLoaded', init);

function init(){
    //レンダラー
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#wave'),
        alpha: true,
        antialias: true
    });
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    //シーン作成
    const scene = new THREE.Scene();

    //カメラ作成
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    //カメラセット
    camera.position.set(5, 2, 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //光源
    dirLight = new THREE.SpotLight(0xffffff, 1.5); //color, 強度
    dirLight.position.set(-30, 40, 30);
    scene.add(dirLight);

    //カメラ制御(マウス操作)
    /*
    const controls = new THREE.OrbitControls(camera, document.body);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    */


    /*
    //gridHelper
    const gridHelper = new THREE.GridHelper(80, 50, 0xffff00); //大きさ、分割数、センターライン
    scene.add(gridHelper);

    //axisHelper
    const axesHelper = new THREE.AxesHelper( 50 );
    scene.add( axesHelper );
    */
    
    let lineArr = [];
    const lineNum = 200; //本数
    const segmentNum = 700; //セグメント数
    const amplitude = 30; //振り幅
    const lineLength = 70;

    
    for(let i = 0; i < lineNum; i++){
        const points = [];
     
        for(let j = 0; j <= segmentNum; j++){
            const x = ((lineLength/segmentNum) * j) - lineLength / 2;
            const y = 0;
            const z = i * 0.3 - ((lineNum * 0.3) / 2);;
            const p = new THREE.Vector3(x,y,z);
            points.push(p);
        }
     
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial();
     
        const line = new THREE.Line(geometry,material);
        lineArr[i] = line;
        scene.add(lineArr[i]);
    }
     
    function rendering(){
        requestAnimationFrame(rendering);
     
        for(let i = 0; i < lineNum; i++){
            const line = lineArr[i];
            const positions = line.geometry.attributes.position.array;
            const time = Date.now() / 4000;
     
            for(let j = 0; j <= segmentNum; j++){
                const x = ((lineLength/segmentNum) * j) - lineLength / 2;
                const px = j / (50 + i);
                const py = i / 50 + time;
                const y =  amplitude * noise.perlin2(px,py);
                const z = i * 0.3 - ((lineNum * 0.3) / 2);
                positions[j * 3] = x;
                positions[j * 3 + 1] = y;
                positions[j * 3 + 2 ] = z;
            }
     
            const h = Math.round((i / lineNum) * 360);
            const s = 100;
            const l = Math.round((i / lineNum) * 100);
            const color = new THREE.Color(`hsl(${h},${s}%,${l}%)`);
     
            line.material.color = color;
     
            line.geometry.attributes.position.needsUpdate = true;
        }
     
        renderer.render(scene,camera);
    }
    rendering();
    //document.getElementById('stage').appendChild(renderer.domElement);
    //renderer.render(scene, camera);

    // 初期化のために実行
    onResize();
    // リサイズイベント発生時に実行
    window.addEventListener('resize', onResize);

    function onResize() {
      // サイズを取得
      const width = window.innerWidth;
      const height = window.innerHeight;

      // レンダラーのサイズを調整する
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      // カメラのアスペクト比を正す
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
}