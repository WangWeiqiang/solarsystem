THREE.Planet = function () {
    THREE.EventTarget.call(this);

    var _this = this;

};

function DrawTrackLine(color, radius, position) {
    
    var size = 360 / radius;
    var linegeometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({ color: color, opacity: 1.0 });
    for (var i = 0; i <= radius; i++) {
        var segment = (i * size) * Math.PI / 180;
        linegeometry.vertices.push(new THREE.Vector3(Math.cos(segment) * radius, 0, Math.sin(segment) * radius));
    }

    return new THREE.Line(linegeometry, material);
    
}

function CreatePlanetSystem(systemname){
    var randx = Math.random();
    var x,y;
    switch(systemname){
        case "sun":
            sununiforms = {
                time: { type: "f", value: 1.0 },
                scale: { type: "f", value: 0.2 }
            };
            var sunmaterial = new THREE.ShaderMaterial({
                uniforms: sununiforms,
                vertexShader: document.getElementById('vertexShader').innerHTML,
                fragmentShader: document.getElementById('fragmentShader').innerHTML,
                transparent: true
            });
            meshSun = new THREE.Mesh(new THREE.SphereGeometry(sun_radius, 50, 50), sunmaterial);
            scene.add(meshSun);
            objects.push(meshSun);
            break;
        case "earth":
            var planetTexture = THREE.ImageUtils.loadTexture("images/earth_atmos_2048.jpg");
            var cloudsTexture = THREE.ImageUtils.loadTexture("images/earth_clouds_1024.png");
            var normalTexture = THREE.ImageUtils.loadTexture("images/earth_normal_2048.jpg");
            var specularTexture = THREE.ImageUtils.loadTexture("images/earth_specular_2048.jpg");

            var moonTexture = THREE.ImageUtils.loadTexture("images/moon_1024.jpg");

            var shader = THREE.ShaderUtils.lib["normal"];
            var uniforms = THREE.UniformsUtils.clone(shader.uniforms);

            uniforms["tNormal"].value = normalTexture;
            uniforms["uNormalScale"].value.set(0.85, 0.85);

            uniforms["tDiffuse"].value = planetTexture;
            uniforms["tSpecular"].value = specularTexture;

            uniforms["enableAO"].value = false;
            uniforms["enableDiffuse"].value = true;
            uniforms["enableSpecular"].value = true;

            uniforms["uDiffuseColor"].value.setHex(0xffffff);
            uniforms["uSpecularColor"].value.setHex(0x333333);
            uniforms["uAmbientColor"].value.setHex(0x000000);

            uniforms["uShininess"].value = 15;

            var parameters = {
                fragmentShader: shader.fragmentShader,
                vertexShader: shader.vertexShader,
                uniforms: uniforms,
                lights: true,
                fog: true
            };

            var materialNormalMap = new THREE.ShaderMaterial(parameters);
            geometry = new THREE.SphereGeometry(radius, 50, 50);
            geometry.computeTangents();


            earth_trackline = DrawTrackLine(0xffffff, distence, 0);
            scene.add(earth_trackline);
            // earth
            meshPlanet = new THREE.Mesh(geometry, materialNormalMap);
            meshPlanet.rotation.y = 0;
            meshPlanet.rotation.z = tilt;
            meshPlanet.position.set(0, 0, distence);
            meshPlanet_camera = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
            meshPlanet_camera.scale.set(0.9, 0.9, 0.9);
            meshPlanet_camera.position.set(0, 0, distence);
            scene.add(meshPlanet_camera);
            scene.add(meshPlanet);
            objects.push(meshPlanet);
            // clouds on the earth
            var materialClouds = new THREE.MeshLambertMaterial({ color: 0xffffff, map: cloudsTexture, transparent: true });
            meshClouds = new THREE.Mesh(geometry, materialClouds);
            meshClouds.scale.set(cloudsScale, cloudsScale, cloudsScale);
            meshClouds.rotation.z = tilt;
            meshClouds.position.set(0, 0, distence);
            scene.add(meshClouds);
            objects.push(meshClouds);
            earthPivot = new THREE.Object3D();

            moonPivot = new THREE.Object3D();
            meshPlanet.add(moonPivot);
            earthPivot.add(meshPlanet);
            earthPivot.add(meshClouds);
            earthPivot.add(meshPlanet_camera);
            // moon
            var materialMoon = new THREE.MeshPhongMaterial({ color: 0xffffff, map: moonTexture });
            meshMoon = new THREE.Mesh(geometry, materialMoon);
            meshMoon.position.set(0, 0, radius * 3);
            meshMoon.scale.set(moonScale, moonScale, moonScale);
            scene.add(meshMoon);
            objects.push(meshMoon);
            moonPivot.add(meshMoon);
            meshSun.add(earthPivot);
            break;
        case "mercury":
            mercuryTrackLine = DrawTrackLine(0xffff00, distence * 0.38, 0);
            scene.add(mercuryTrackLine);
            var meterialMercury = new THREE.MeshPhongMaterial({ color: 0xffffff, map: THREE.ImageUtils.loadTexture("images/shuixing.jpg") });
            meshMercury = new THREE.Mesh(geometry, meterialMercury);
            meshMercury.scale.set(0.3, 0.3, 0.3);
            x = distence * 0.38 * randx;
            y = Math.sqrt(distence * 0.38 * distence * 0.38 - x * x);
            meshMercury.position.set(x,0,y);
            scene.add(meshMercury);
            meshMercury_camera = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
            meshMercury_camera.scale.set(0.2, 0.2, 0.2);
            meshMercury_camera.position.set(x, 0,y);
            mercuryPivot = new THREE.Object3D();
            meshSun.add(mercuryPivot);
            mercuryPivot.add(meshMercury);
            mercuryPivot.add(meshMercury_camera);
            break;
        case "venus":
            venusTrackLine = DrawTrackLine(0x00ff00, distence * 0.72, 0);
            scene.add(venusTrackLine);
            var meterialVenus = new THREE.MeshPhongMaterial({ color: 0xffffff, map: THREE.ImageUtils.loadTexture("images/jinxing.jpg") });
            meshVenus = new THREE.Mesh(geometry, meterialVenus);
            meshVenus.scale.set(0.8, 0.8, 0.8);
            x = distence * 0.72 * randx;
            y = Math.sqrt(distence * 0.72 * distence * 0.72 - x * x);
            meshVenus.position.set(x, 0, y);
            meshVenus_camera = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
            meshVenus_camera.scale.set(0.7, 0.7, 0.7);
            meshVenus_camera.position.set(x, 0, y);
            venusPivot = new THREE.Object3D();
            meshSun.add(venusPivot);
            venusPivot.add(meshVenus);
            venusPivot.add(meshVenus_camera);
            break;
        case "mars":
            marsTrackLine = DrawTrackLine(0x00ffff, distence * 1.52, 0);
            scene.add(marsTrackLine);
            var meterialMars = new THREE.MeshPhongMaterial({ color: 0xffffff, map: THREE.ImageUtils.loadTexture("images/huoxing.jpg") });
            meshMars = new THREE.Mesh(geometry, meterialMars);
            meshMars.scale.set(0.6, 0.6, 0.6);
            x = distence * 1.52 * randx;
            y = Math.sqrt(distence * 1.52 * distence * 1.52 - x * x);
            meshMars.position.set(x, 0,y);
            meshMars_camera = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
            meshMars_camera.scale.set(0.5, 0.5, 0.5);
            meshMars_camera.position.set(x, 0, y);
            marsPivot = new THREE.Object3D();
            meshSun.add(marsPivot);
            marsPivot.add(meshMars);
            marsPivot.add(meshMars_camera);
            break;
        case "jupiter":
            jupiterTrackLine = DrawTrackLine(0xff0000, distence * 5.22, 0);
            scene.add(jupiterTrackLine);
            var meterialJupiter = new THREE.MeshPhongMaterial({ color: 0xffffff, map: THREE.ImageUtils.loadTexture("images/muxing.jpg"), transparent: true });
            meshJupiter = new THREE.Mesh(geometry, meterialJupiter);
            meshJupiter.scale.set(11, 11, 11);
            x = distence * 5.22 * randx;
            y = Math.sqrt(distence * 5.22 * distence * 5.22 - x * x);
            meshJupiter.position.set(x, 0, y);
            meshJupiter_camera = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
            meshJupiter_camera.scale.set(10, 10, 10);
            meshJupiter_camera.position.set(x, 0, y);
            jupiterPivot = new THREE.Object3D();
            meshSun.add(jupiterPivot);
            jupiterPivot.add(meshJupiter);
            jupiterPivot.add(meshJupiter_camera);
            scene.add(meshJupiter);
            break;
        case "saturm":
            saturmTrackLine = DrawTrackLine(0xff0000, distence * 9.57, 0);
            scene.add(saturmTrackLine);
            var meterialSaturm = new THREE.MeshPhongMaterial({ color: 0xffffff, map: THREE.ImageUtils.loadTexture("images/tuxing.jpg") });
            meshSaturm = new THREE.Mesh(geometry, meterialSaturm);
            meshSaturm.scale.set(9.4, 9.4, 9.4);
            x = distence * 9.57 * randx;
            y = Math.sqrt(distence * 9.57 * distence * 9.57 - x * x);
            meshSaturm.position.set(x, 0, y);
            meshSaturm_camera = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
            meshSaturm_camera.scale.set(9.3, 9.3, 9.3);
            meshSaturm_camera.position.set(x, 0,y);
            saturmPivot = new THREE.Object3D();
            meshSun.add(saturmPivot);
            saturmPivot.add(meshSaturm);
            saturmPivot.add(meshSaturm_camera);
            break;
        case "uranus":
            uranusTrackLine = DrawTrackLine(0xff0000, distence * 19.34, 0);
            scene.add(uranusTrackLine);
            var meterialUranus = new THREE.MeshPhongMaterial({ color: 0xffffff, map: THREE.ImageUtils.loadTexture("images/tianwangxing.jpg") });
            meshUranus = new THREE.Mesh(geometry, meterialUranus);
            meshUranus.scale.set(3.98, 3.98, 3.98);
            x = distence *19.34* randx;
            y = Math.sqrt(distence * 19.34 * distence * 19.34 - x * x);
            meshUranus.position.set(x, 0, y);
            meshUranus_camera = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
            meshUranus_camera.scale.set(3.9, 3.9, 3.9);
            meshUranus_camera.position.set(x, 0, y);
            uranusPivot = new THREE.Object3D();
            meshSun.add(uranusPivot);
            uranusPivot.add(meshUranus);
            uranusPivot.add(meshUranus_camera);
            scene.add(meshUranus);
            break;
        case "neptune":
            neptuneTrackLine = DrawTrackLine(0xff0000, distence * 30.35, 0);
            scene.add(neptuneTrackLine);
            var meterialNeptune = new THREE.MeshPhongMaterial({ color: 0xffffff, map: THREE.ImageUtils.loadTexture("images/haiwangxing.jpg") });
            meshNeptune = new THREE.Mesh(geometry, meterialNeptune);
            meshNeptune.scale.set(3.85, 3.85, 3.85);
            meshNeptune.position.set(-distence * 30.35, 0, 0);
            meshNeptune_camera = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
            meshNeptune_camera.scale.set(3.8, 3.8, 3.8);
            meshNeptune_camera.position.set(-distence * 30.35, 0, 0);
            neptunePivot = new THREE.Object3D();
            meshSun.add(neptunePivot);
            neptunePivot.add(meshNeptune);
            neptunePivot.add(meshNeptune_camera);
            scene.add(meshNeptune);
            break;
    }
}

function CreateStarts(){
    var i, r = radius * 10, starsGeometry = [new THREE.Geometry(), new THREE.Geometry()];
            for (i = 0; i < 250; i++) {
                var vertex = new THREE.Vector3();
                vertex.x = 0; //Math.random() * 100;
                vertex.y = Math.random() * 100;
                vertex.z = Math.random() * 10;
                vertex.multiplyScalar(r);
                starsGeometry[0].vertices.push(vertex);
            }

            for (i = 0; i < distence * 10; i++) {
                var vertex = new THREE.Vector3();
                vertex.x = Math.random() * 100;
                vertex.y = Math.random() * 100;
                vertex.z = 0; //Math.random() * 100;
                vertex.multiplyScalar(r);
                starsGeometry[1].vertices.push(vertex);
            }

            var stars;
            var starsMaterials = [new THREE.ParticleBasicMaterial({ color: 0x555555, size: 1, sizeAttenuation: false }),
                     new THREE.ParticleBasicMaterial({ color: 0x555555, size: 1, sizeAttenuation: false }),
                     new THREE.ParticleBasicMaterial({ color: 0x333333, size: 2, sizeAttenuation: false }),
                     new THREE.ParticleBasicMaterial({ color: 0x3a3a3a, size: 1, sizeAttenuation: false }),
                     new THREE.ParticleBasicMaterial({ color: 0x1a1a1a, size: 2, sizeAttenuation: false }),
                     new THREE.ParticleBasicMaterial({ color: 0x1a1a1a, size: 1, sizeAttenuation: false })
                     ];

            for (i = 10; i < 30; i++) {
                stars = new THREE.ParticleSystem(starsGeometry[i % 2], starsMaterials[i % 6]);
                stars.rotation.x = 0;//Math.random() * 100;
                stars.rotation.y = 0;//Math.random() * 100;
                stars.rotation.z = Math.random() * 10;
                s = i * 50;
                stars.scale.set(s, s, s);
                stars.matrixAutoUpdate = false;
                stars.updateMatrix();
                scene.add(stars);

            }

}