//Global vars
    
    //scene basics
    var renderer, raycaster, scene, camera, container;
    var containerWidth, containerHeight;
    var controls, lights;

    //post pro vars
    var depthMaterial, depthTarget, composer;
    var effectComposer;
    var ssaoPass;
    var postprocessing = { enabled: true, onlyAO: false, radius: 10, aoClamp: 1, lumInfluence: 1, tDepth: depthTarget };
    var effectCopy;
    var depthScale = 1.0;
    
    //obj loading
    var manager = new THREE.LoadingManager();
    var objLoader = new THREE.OBJLoader(manager); 
    var textureLoader = new THREE.TextureLoader();
    var displacementMap = new THREE.TextureLoader();
    var bumpMap = new THREE.TextureLoader();
    
    //object organization
    var group = new THREE.Group(); 

    //Time to make a scene
        //Connect three.JS to canvas elem
            var container = document.getElementById('HeartJS');
            containerWidth = container.containerWidth;
            containerHeight = container.containerHeight;

            //For hovering & selecting
                var raycaster = new THREE.Raycaster();
                var mouse = new THREE.Vector2();
        
        //Set up Renderer
            var renderer = new THREE.WebGLRenderer({antialias:true});
            containerWidth = container.offsetWidth;
            containerHeight = container.offsetHeight;
                       
        //Scene + Camera
            camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.z = 200;                    
            scene = new THREE.Scene();
            scene.background = new THREE.Color (0xf0f0f0);
            scene.add(camera);
            renderer.setSize(container.clientWidth, container.clientHeight, false);
            document.getElementById("HeartJS").appendChild (renderer.domElement);

        //Controls
            var controls = new THREE.OrbitControls(camera, renderer.domElement, container);
            container.appendChild(renderer.domElement);
            controls.enableDamping = true;
            controls.campingFactor = 0.25;
            controls.enableZoom = true;

        //Lighting 
            var light = new THREE.HemisphereLight(0xfcda97, 0x97edfc, 1);
            scene.add(light);

            var light = new THREE.PointLight( 0xffffff, 0.3, 100 );
            light.position.set( 60, 120, 50 );
            light.castShadow = true;
                    //light.shadow.camera.near = 1;
                    //light.shadow.camera.far = 60;
                    //light.shadow.bias = - 0.005;
            scene.add( light );

            var backLight = new THREE.DirectionalLight(0xffffff, 0.08);
            backLight.position.set(100, 0, -100).normalize();
            scene.add( backLight );

            var fillLight = new THREE.DirectionalLight(new THREE.Color('#97edfc'), 0.08);
            fillLight.position.set(100, -50, 100);
            light.castShadow = true;
            scene.add(fillLight);

            var keyLight = new THREE.DirectionalLight(new THREE.Color('#fcda97'), 0.1);
            keyLight.position.set (-100, 50, 50).normalize();
            light.castShadow = true;
            scene.add(keyLight)

   
    //hold THREE.Mesh instances
    var loadedMeshes =[];
    
//Make Objects and meshes????
        textureLoader.load ('Assets/RKHP copy.jpg', function (texture) { 
        displacementMap.load('Assets/RKDisplace.jpg', function (displace){                 
        bumpMap.load('Assets/RKBump.jpg', function (norm){   
        //load the given .obj file from the 'high' or 'low' folder based on user's graphics quality preference
        objLoader.load('Assets/RKLP.OBJ', function (object) {
        //objLoader by default loads .obj files in as bufferGeometry (not straight geometry)
               object.traverse(function (child) { //traverse iterates contained function over all children of object
                var mat = new THREE.MeshPhysicalMaterial({
                map: texture,
                clearCoat: .75,
                clearCoatRoughness: 0.25,
                transparent:true,
                displacementMap: displace,
                displacementScale: 0.23,
                bumpMap: norm,
                bumpScale: 0.1,
                reflectivity: .6,
                roughness: 0.3,
                metalness: 0,
                refractionRatio: 0.75,
             }); 

                if (child instanceof THREE.Mesh) {
                    child.name = 'Right Kidney';
                    child.material = mat; 
                    loadedMeshes.push(child);

                    //geo = new THREE.Geometry().fromBufferGeometry(child.geometry); //create geometry from buffer geometry
                    //geo.mergeVertices();
                    //geo.computeVertexNormals();
                    //geo.computeFaceNormals();


                }


            });

            scene.add(object);
        });
        });
        }); 
    });


         textureLoader.load ('Assets/RKUHP.jpg', function (texture) {
         displacementMap.load('Assets/RKUDisplace.jpg', function (displace){
         bumpMap.load('Assets/RKUBump.jpg', function (norm){                 
        //load the given .obj file from the 'high' or 'low' folder based on user's graphics quality preference
        objLoader.load('Assets/RKULP.OBJ', function (object) {
        //objLoader by default loads .obj files in as bufferGeometry (not straight geometry)
               object.traverse(function (child) { //traverse iterates contained function over all children of object
                var mat = new THREE.MeshPhysicalMaterial({
                map: texture,
                clearCoat: .75,
                clearCoatRoughness: 0.25,
                transparent:true,
                displacementMap: displace,
                displacementScale: 0.5,
                bumpMap: norm,
                bumpScale: 0.1,
                reflectivity: .6,
                roughness: 0.3,
                metalness: 0,
                refractionRatio: 0.75,
             }); 
                if (child instanceof THREE.Mesh) {
                    child.name = 'Right Ureter';
                    child.material = mat; 
                    loadedMeshes.push(child);

                    //geo = new THREE.Geometry().fromBufferGeometry(child.geometry); //create geometry from buffer geometry
                    //geo.mergeVertices();
                    //geo.computeVertexNormals();
                    //geo.computeFaceNormals();


                }


            });

            scene.add(object);
        });
        });
        }); 
    });

         textureLoader.load ('Assets/LKUHP.jpg', function (texture) {                 
         displacementMap.load('Assets/LKU-Displace.jpg', function (displace){ 
         bumpMap.load('Assets/LKUBump.jpg', function (norm){ 
        //load the given .obj file from the 'high' or 'low' folder based on user's graphics quality preference
        objLoader.load('Assets/LKULP.OBJ', function (object) {
        //objLoader by default loads .obj files in as bufferGeometry (not straight geometry)
               object.traverse(function (child) { //traverse iterates contained function over all children of object
                var mat = new THREE.MeshPhysicalMaterial({
                map: texture,
                clearCoat: .75,
                clearCoatRoughness: 0.25,
                transparent:true,
                displacementMap: displace,
                displacementScale: 0.36,
                bumpMap: norm,
                bumpScale: 0.1,
                reflectivity: .6,
                roughness: 0.3,
                metalness: 0,
                refractionRatio: 0.75,
             }); 
                if (child instanceof THREE.Mesh) {
                    child.name = 'Left Ureter';
                    child.material = mat; 
                    loadedMeshes.push(child);

                    //geo = new THREE.Geometry().fromBufferGeometry(child.geometry); //create geometry from buffer geometry
                    //geo.mergeVertices();
                    //geo.computeVertexNormals();
                    //geo.computeFaceNormals();


                }


            });

            scene.add(object);
        });
        });
        });
    });

        textureLoader.load ('Assets/LKHP.jpg', function (texture) { 
        displacementMap.load('Assets/LKDisplace.jpg', function (displace){  
        bumpMap.load('Assets/LKBump.jpg', function (norm){               
        //load the given .obj file from the 'high' or 'low' folder based on user's graphics quality preference
        objLoader.load('Assets/LKLP.OBJ', function (object) {
        //objLoader by default loads .obj files in as bufferGeometry (not straight geometry)
               object.traverse(function (child) { //traverse iterates contained function over all children of object
                var mat = new THREE.MeshPhysicalMaterial({
                map: texture,
                clearCoat: .75,
                clearCoatRoughness: 0.25,
                transparent:true,
                displacementMap: displace,
                displacementScale: 0.3,
                bumpMap: norm,
                bumpScale: 0.1,
                reflectivity: .6,
                roughness: 0.3,
                metalness: 0,
                refractionRatio: 0.75,
             }); 
                if (child instanceof THREE.Mesh) {
                    child.name = 'Left Kidney';
                    child.material = mat; 
                    loadedMeshes.push(child);

                    //geo = new THREE.Geometry().fromBufferGeometry(child.geometry); //create geometry from buffer geometry
                    //geo.mergeVertices();
                    //geo.computeVertexNormals();
                    //geo.computeFaceNormals();


                }


            });

            scene.add(object);
        });
        });
        }); 
    });



        textureLoader.load ('Assets/AortaHP.jpg', function (texture) { 
        displacementMap.load('Assets/Aorta-Displace.jpg', function (displace){
        bumpMap.load('Assets/AortaBump.jpg', function (norm){                
         //load the given .obj file from the 'high' or 'low' folder based on user's graphics quality preference
        objLoader.load('Assets/AortaLP.OBJ', function (object) {
        //objLoader by default loads .obj files in as bufferGeometry (not straight geometry)
               object.traverse(function (child) { //traverse iterates contained function over all children of object
                 var mat = new THREE.MeshPhysicalMaterial({
                map: texture,
                clearCoat: 1,
                clearCoatRoughness: 0.25,
                transparent:true,
                displacementMap: displace,
                displacementScale: 0.23,
                bumpMap: norm,
                bumpScale: 0.1,
                reflectivity: 0.6,
                roughness: 0.4,
                metalness: 0,
                refractionRatio: 0.75,
             }); 
                if (child instanceof THREE.Mesh) {
                    child.name = 'Aorta';
                    child.material = mat; 
                    loadedMeshes.push(child);

                    //geo = new THREE.Geometry().fromBufferGeometry(child.geometry); //create geometry from buffer geometry
                    //geo.mergeVertices();
                    //geo.computeVertexNormals();
                    //geo.computeFaceNormals();


                }


            });

            scene.add(object);
        });
        });
        }); 
    });

    textureLoader.load ('Assets/IVC2018.jpg', function (texture) { 
    displacementMap.load('Assets/IVC-Displace.jpg', function (displace){                  
    bumpMap.load('Assets/IVCBump.jpg', function (norm){       
        //load the given .obj file from the 'high' or 'low' folder based on user's graphics quality preference
        objLoader.load('Assets/IVCLP.OBJ', function (object) {
        //objLoader by default loads .obj files in as bufferGeometry (not straight geometry)
               object.traverse(function (child) { //traverse iterates contained function over all children of object
                 var mat = new THREE.MeshPhysicalMaterial({
                map: texture,
                clearCoat: 1,
                clearCoatRoughness: 0.25,
                transparent:true,
                displacementMap: displace,
                displacementScale: 0.23,
                bumpMap: norm,
                bumpScale: 0.1,
                reflectivity: 0.6,
                roughness: 0.4,
                metalness: 0,
                refractionRatio: 0.75,
             }); 
                if (child instanceof THREE.Mesh) {
                    child.name = 'Inferior Vena Cava';
                    child.material = mat; 
                    loadedMeshes.push(child);

                    //geo = new THREE.Geometry().fromBufferGeometry(child.geometry); //create geometry from buffer geometry
                    //geo.mergeVertices();
                    //geo.computeVertexNormals();
                    //geo.computeFaceNormals();


                }


            });

            scene.add(object);
        });
        });
        });
    });

    // Selection specific Vars
        var lastSelected;
        var INTERSECTED;
        var intersects = [];

        //Mouse Move events
        
        function onMouseClick( event ) {
            // calculate mouse position in normalized device coordinates
            // (-1 to +1) for both components
            mouse.x = ( event.offsetX / container.clientWidth ) * 2 - 1;
            mouse.y = - ( event.offsetY / container.clientHeight ) * 2 + 1;
            console.log(mouse);
            
            // update the picking ray with the camera and mouse position
            raycaster.setFromCamera( mouse, camera);
            // calculate objects intersecting the picking ray
            var intersects = raycaster.intersectObjects( loadedMeshes );
            // print out if any intersections occurs
            // length is 0 if no intersection
            console.log(intersects);
            // Check if mouse click intersects with 1 or more meshes
            if (intersects.length > 0) // it does...rejoice
            {
                // first entry in intersects array is always the closest (shortest distance)
                lastSelected = intersects[0].object.name;
                
                if ( intersects[ 0 ].object != INTERSECTED )
                    {
                // restore previous intersection object (if it exists) to its original color
                    if ( INTERSECTED )
                        INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
                        // store reference to closest object as current intersection object
                        INTERSECTED = intersects[ 0 ].object;
                        // store color of closest object (for later restoration)
                        INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                        // set a new color for closest object
                        INTERSECTED.material.color.setHex( 0xE6E7E8);
                }
            }   

            else // nothing intersected with...
            {
                // Remove any reference to a string that last selected may have
                lastSelected = undefined;   

                // restore previous intersection object (if it exists) to its original color
                if ( INTERSECTED )
                    INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
                    // remove previous intersection object reference
                    //by setting current intersection object to "nothing"
                    INTERSECTED = null;
                } 
            
            console.log("lastSelected = " + lastSelected);

             if (lastSelected == undefined){
                     return false;
              
                }
            
            if (lastSelected == questions[currentQuestionIndex].answerElementID) // match!
            {
                q_els[currentQuestionIndex].feedbackText.textContent =  "You got it!";
                q_els[currentQuestionIndex].score.textContent =  "1/1";
                q_els[currentQuestionIndex].feedbackText.classList.add("correct");
                q_els[currentQuestionIndex].score.classList.add("correct");
                q_els[currentQuestionIndex].nextBtn.classList.add("correct");
                
            }

            else // no match!
            {
                q_els[currentQuestionIndex].feedbackText.textContent = "Sorry, Try again.";
                q_els[currentQuestionIndex].score.textContent =  "0/1";
                q_els[currentQuestionIndex].feedbackText.classList.remove("correct");
                q_els[currentQuestionIndex].score.classList.remove("correct");
                q_els[currentQuestionIndex].nextBtn.classList.remove("correct");
            }   

        } 

        function initPostProcessing() {
            // Setup render pass
            
            effectComposer = new THREE.EffectComposer( renderer );
            var renderPass = new THREE.RenderPass( scene, camera );

            //Depth
            depthMaterial = new THREE.MeshDepthMaterial();
              depthMaterial.depthPacking = THREE.RGBADepthPacking;
              depthMaterial.blending = THREE.NoBlending;

              var pars = {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter
              };
             
              depthTarget = new THREE.WebGLRenderTarget(container.clientWidth, container.clientHeight, pars);

             // FXAA
              var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
              effectFXAA.uniforms['resolution'].value.set( 1 /container.clientWidth, 1 /container.clientHeight);
              effectFXAA.renderToScreen = false;
        
              //SSAO
              depthTarget = new THREE.WebGLRenderTarget( container.clientWidth, container.clientHeight, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat } );
              ssaoPass = new THREE.SSAOPass( scene, camera );
              ssaoPass.renderToScreen = false; //only last post pro is true.

              //Copy Shader
              var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
              effectCopy.renderToScreen = true;

                
                effectComposer.addPass( renderPass );
                effectComposer.addPass (effectFXAA);
                effectComposer.addPass( ssaoPass );
                effectComposer.addPass(effectCopy);

             
    

            }

        function onWindowResize(e){
                // Change the camera aspect ratio so that is matches the aspect ratio of the container element
                camera.aspect = container.clientWidth / container.clientHeight;
                // Change the size of the output raster image to match the size of the container element
                renderer.setSize( container.clientWidth, container.clientHeight, false);
                effectComposer.setSize( container.clientWidth, container.clientHeight, false);
                // Need to do this to get the camera.aspect new values to be applied.
                camera.updateProjectionMatrix ();
                console.log("Resize event");
                
            }

        function animate (){
      
            requestAnimationFrame(animate);
            controls.update();
     
            //Post Pro
            scene.overrideMaterial = depthMaterial;
            renderer.render( scene, camera, depthTarget, true );
            effectComposer.render();
            scene.overrideMaterial = null;
         } 

        function render() {
    
            renderer.render( scene, camera );
         }

           window.addEventListener("resize", onWindowResize, false);
           container.addEventListener('click', onMouseClick, false);


//RUN THE THINGS
        initPostProcessing();
        animate();     
        