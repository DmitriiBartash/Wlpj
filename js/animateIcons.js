document.addEventListener("DOMContentLoaded", async () => {
    // topL left eye  17830 32719
    // topL right eye M20564 32719
    let offsetX = 200;
    let offsetY = 900;

    let initLeftPos = { x: 18510, Y: 31819 };
    let initRightPos = { x: 20244, Y: 31818 };

    // get paths
    let leftEye = document.querySelector("#leftEye");
    let rightEye = document.querySelector("#rightEye");
    const dAttributeLeft = leftEye.getAttribute("d");
    const dAttributeRight = rightEye.getAttribute("d");

    // get tailing text
    let leftTail = "";
    for (let i = 2; i < dAttributeLeft.split(" ").length; i++) {
        leftTail += dAttributeLeft.split(" ")[i] + " ";
    }
    let rightTail = "";
    for (let i = 2; i < dAttributeRight.split(" ").length; i++) {
        rightTail += dAttributeRight.split(" ")[i] + " ";
    }

    // prepare ints
    let leftEyeLocationX = parseInt(removeLetter(dAttributeLeft.split(" ")[0]));
    let rightEyeLocationX = parseInt(removeLetter(dAttributeRight.split(" ")[0]));
    let leftEyeLocationY = parseInt(dAttributeLeft.split(" ")[1]);
    let rightEyeLocationY = parseInt(dAttributeRight.split(" ")[1]);

    // set source 
    const leftEyeCoords = { x: leftEyeLocationX, y: leftEyeLocationY };
    const rightEyeCoords = { x: rightEyeLocationX, y: rightEyeLocationY };

    // set destination
    const LE_positionsLeftTop = interpolate2DPosition(leftEyeCoords, { x: leftEyeLocationX - offsetX, y: 32719 }, 60);
    const RE_positionsRightTop = interpolate2DPosition(rightEyeCoords, { x: rightEyeLocationX - offsetX, y: 32719 }, 60);

    // move them top left 
    await animateBoth(LE_positionsLeftTop, RE_positionsRightTop);
    console.log("Finished top left");

    // move them top right





    // helper function

    async function animateBoth(_leftEye, _rightEye) {
        await Promise.all([animate(_leftEye, leftTail, leftEye), animate(_rightEye, rightTail, rightEye)
        ]);
    }

    async function animate(animateTo, tail, theEye) {
        for (let j = 0; j < animateTo.length; j++) {
            theEye.setAttribute("d", `M${Math.floor(animateTo[j].x)} ${Math.floor(animateTo[j].y)} ${tail}`);
            await new Promise(r => setTimeout(r, 100));
        }
    }

    function removeLetter(coordinates) {
        let newCoord = "";
        for (let i = 1; i < coordinates.length; i++) {
            newCoord += coordinates[i];
        }
        return newCoord;
    }

    function interpolate2DPosition(startPosition, endPosition, steps) {
        const positions = [];
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = startPosition.x + (endPosition.x - startPosition.x) * t;
            const y = startPosition.y + (endPosition.y - startPosition.y) * t;

            positions.push({ x, y });
        }
        return positions;
    }
});

