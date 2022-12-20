cont = document.getElementById("container")

check = document.getElementById("check")

MCB_Blue = document.getElementById("mcb_b")
MCB_Yellow = document.getElementById("mcb_y")
MCB_Red = document.getElementById("mcb_r")

rotor = document.getElementById("rotor2")

StarterInRed = document.getElementById("i_r")
StarterInYel = document.getElementById("i_b")
StarterInBlu = document.getElementById("i_y")
StarterOutRed = document.getElementById("o_r")
StarterOutYel = document.getElementById("o_b")
StarterOutBlu = document.getElementById("o_y")

MotorInRed = document.getElementById("motor-1")
MotorInYel = document.getElementById("motor-2")
MotorInBlu = document.getElementById("motor-3")
// MotorOutRed = document.getElementById("motor-4")
// MotorOutYel = document.getElementById("motor-5")
// MotorOutBlu = document.getElementById("motor-6")

VoltmeterPositive = document.getElementById("p_v")
VoltmeterNegative = document.getElementById("n_v")

AmmeterPositive = document.getElementById("p_a")
AmmeterNegative = document.getElementById("n_a")

var StarterNodeEmpty;
var MotorNodeEmpty;

const instance = jsPlumb.getInstance({
    container: cont
});

instance.bind("ready", function () {
    instance.registerConnectionTypes({
        "blue": {
            paintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 }
        },
        "red": {
            paintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 }
        },
        "blue0": {
            paintStyle: { stroke: "blue", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "blue", strokeWidth: 2.5 }
        },
        "red0": {
            paintStyle: { stroke: "red", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "red", strokeWidth: 2.5 }
        },
        "yellow0": {
            paintStyle: { stroke: "yellow", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "yellow", strokeWidth: 2.5 }
        }
    })

    instance.addEndpoint([MCB_Red], {
        endpoint: "Dot",
        anchor: [["Center"]],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "red0",
        paintStyle: { fill: "red", strokeWidth: 2.5 },
        maxConnections: 10,
        connector: ["StateMachine", { curviness: 50 }]
    })

    instance.addEndpoint([MCB_Blue], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "blue0",
        paintStyle: { fill: "blue", strokeWidth: 2.5 },
        maxConnections: 10
    })

    instance.addEndpoint([MCB_Yellow], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "yellow0",
        paintStyle: { fill: "yellow", strokeWidth: 2.5 },
        maxConnections: 10
    })

    instance.addEndpoint([StarterInBlu, StarterInRed, StarterInYel, StarterOutBlu, StarterOutRed, StarterOutYel, MotorInBlu, MotorInRed, MotorInYel, VoltmeterPositive, AmmeterPositive], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "red",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        maxConnections: 10
    })

    // instance.addEndpoint([MotorOutBlu, MotorOutRed, MotorOutYel], {
    //     endpoint: "Dot",
    //     anchor: ["Center"],
    //     isSource: true,
    //     isTarget: true,
    //     connectionsDetachable: true,
    //     connectionType: "red",
    //     paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
    //     maxConnections: 10,
    //     connector: ["StateMachine", { curviness: -50, proximityLimit: 1 }]
    // })

    instance.addEndpoint([VoltmeterNegative, AmmeterNegative], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "blue",
        paintStyle: { fill: "rgb(97, 97, 229)", strokeWidth: 2.5 },
        maxConnections: 10
    })
})

// var validConn = [MotorOutRed, VoltmeterPositive, MotorOutRed, AmmeterPositive, MotorOutBlu, VoltmeterNegative, motorin]

function isConnected(node1, node2) {
    if ((instance.getConnections({ source: node1, target: node2 })[0] != undefined) || (instance.getConnections({ source: node2, target: node1 })[0] != undefined)) {
        return true;
    }
    else {
        return false;
    }
}

function MCBToStarter() {
    let MCB_nodes = [MCB_Red, MCB_Blue, MCB_Yellow]
    let Starter_nodes = [StarterInRed, StarterInBlu, StarterInYel]
    let counter = 0;

    for (let i = 0; i < MCB_nodes.length; i++) {
        for (let j = 0; j < Starter_nodes.length; j++) {
            if (isConnected(MCB_nodes[i], Starter_nodes[j])) {
                counter = counter + 1;
            }
        }
    }

    if (counter == 3) {
        return true;
    }
    else {
        return false;

    }
}

function StarterToMotor() {
    let Starter_nodes = [StarterOutBlu, StarterOutRed, StarterOutYel]
    let MotorInNodes = [MotorInBlu, MotorInRed, MotorInYel]
    let counter = 0;
    let motor_connected_r = 0;
    let motor_connected_b = 0;
    let motor_connected_y = 0;

    for (let i = 0; i < Starter_nodes.length; i++) {
        let starter_connected = 0;
        for (let j = 0; j < MotorInNodes.length; j++) {
            if (isConnected(Starter_nodes[i], MotorInNodes[j])) {
                counter = counter + 1;
                starter_connected = starter_connected + 1;
                switch (j) {
                    case 0:
                        motor_connected_b = motor_connected_b + 1
                        break;
                    case 1:
                        motor_connected_r = motor_connected_r + 1
                        break;
                    case 2:
                        motor_connected_y = motor_connected_y + 1
                        break;
                }
                MotorInNodes.splice(MotorInNodes.indexOf(MotorInNodes[j]), 1)
                break;
            }
        }

        if (starter_connected == 0) {
            console.log(Starter_nodes[i]);
            StarterNodeEmpty = Starter_nodes[i];
        }
    }

    if (motor_connected_b == 0) {
        MotorNodeEmpty = MotorInBlu
    }
    else if (motor_connected_y == 0) {
        MotorNodeEmpty = MotorInYel
    }
    else if (motor_connected_r == 0) {
        MotorNodeEmpty = MotorInRed
    }

    if (counter == 2) {
        return true;
    }
    else {
        return false;
    }
}

/*function MotorOuts(){
    let MotorOutNodes = [MotorOutBlu, MotorOutRed, MotorOutYel]
    let indexes = [1, 2, 4]

    let counter = 0
    for(let i=0; i<MotorOutNodes.length; i++){
        for(let j=0; j<MotorOutNodes.length; j++){
            
            if(isConnected(MotorOutNodes[i], MotorOutNodes[j])){
                counter = counter + (indexes[i] + indexes[j]);
            }
        }    
    }

    if((counter/2 == 9)||(counter/2 == 8)||(counter/2 == 11)||(counter/2 == 14)){
        return true;
    }
    else{
        return false;
    }
}*/

function EmptyCheck(st_node, mt_node) {
    if (isConnected(st_node, VoltmeterPositive)) {
        if (isConnected(st_node, AmmeterPositive)) {
            if (isConnected(mt_node, AmmeterNegative)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

function StrayNode() {
    let node_list = [StarterOutBlu, StarterOutRed, StarterOutYel, MotorInBlu, MotorInRed, MotorInYel]
    let counter = 0;
    node_list.splice(node_list.indexOf(StarterNodeEmpty), 1)
    node_list.splice(node_list.indexOf(MotorNodeEmpty), 1)

    for (let i = 0; i < node_list.length; i++) {
        if (isConnected(node_list[i], VoltmeterNegative)) {
            counter = counter + 1
        }
    }

    if (counter == 1) {
        if (instance.getConnections({ source: VoltmeterNegative }).length == 1) {
            return true
        }
        else {
            return false
        }
    }
    else {
        return false
    }
}

check.onclick = function checkConn() {
    if (MCBToStarter() && StarterToMotor()) {
        if (EmptyCheck(StarterNodeEmpty, MotorNodeEmpty)) {
            if (StrayNode()) {
                window.alert("Right Connections!")
            }
        }
    }
}

var allow = 0

function RotateRotor(i) {
    setTimeout(function () {
        rotor.style.transform = "rotate(" + i + "deg)"
    }, 2 * i);
}

function callRotate() {
    for (let i = 0; i < 360; i++) {
        RotateRotor(i);
    }
}

function test(i) {
    setTimeout(function () {
        if(allow == 1){
            callRotate();
        }
    }, 720 * i);
}

function calltest() {

    for (var i = 0; i < 65536; i++) {
        test(i);
    }
}

