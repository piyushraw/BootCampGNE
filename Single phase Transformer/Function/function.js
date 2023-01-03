



// const bulbImages = [                                                  //   Index value of Array starts from zero       

//     '../Assets/Switch_Off.png',                                               //0
//     '../Assets/Switch_On.png',                                                      //1
//     '../Assets/Switch_Off2.png',                                               //2
//     '../Assets/Switch_On2.png',                                                     //3
//     '../Assets/Switch_Off3.png',                                               //4
//     '../Assets/Switch_On3.png',                                                     //5
//                                                       //7
                                                     
// ]

// const img = document.getElementById('imgClickAndChange');
// img.addEventListener('click',() => {
// img.src = bulbImages[1];

// document.getElementById('R-lamp').src = '../Assets/r_on.png'

// img.addEventListener('click',() => {
// img.src = bulbImages[0];

// document.getElementById('R-lamp').src = '../Assets/r_off.png'

// }) 

// })


// const img2 = document.getElementById('imgClickAndChange2');
// img2.addEventListener('click',() => {
// img2.src = bulbImages[3];

// document.getElementById('Y-lamp').src=  '../Assets/y_on.png'



// img2.addEventListener('click',() => {
// img2.src = bulbImages[2];

// document.getElementById('Y-lamp').src= '../Assets/y_off.png'

// })

// })

// const img3 = document.getElementById('imgClickAndChange3');
// img3.addEventListener('click',() =>  {
// img3.src = bulbImages[5];

// document.getElementById('B-lamp').src= '../Assets/b_on.png'


// img3.addEventListener('click',() =>  {
// img3.src = bulbImages[4];

// document.getElementById('B-lamp').src = '../Assets/b_off.png'

// })

// })

      // we start the coding from here 


      var cont = document.getElementById("container")

      //var ps = document.getElementById("pow-start")
      
      var check = document.getElementById("check")
      var add = document.getElementById("add")
      var plot = document.getElementById("plot")
      var prnt = document.getElementById("print")
      var prnt = document.getElementById("print")
      var reset = document.getElementById("reset")
      var myPlot = document.getElementById("myPlot")
      
      var vtable = document.getElementById("valTable")
      
      var r1val = document.getElementById("r1val")
      var r2val = document.getElementById("r2val")
      var r3val = document.getElementById("r3val")
      
      var PSval = document.getElementById("PSval")
      var PSdis = document.getElementById("PSdis")
      
      var tIR1 = document.getElementById("textInputR1")
      var tIR2 = document.getElementById("textInputR2")
      var tIR3 = document.getElementById("textInputR3")
      
      var ndl1 = document.getElementById("ndl1")
      var ndl2 = document.getElementById("ndl2")
      var ndl3 = document.getElementById("ndl3")
      
      var p_mcb = document.getElementById("p_mcb")
      var n_mcb = document.getElementById("n_mcb")
      var p_v = document.getElementById("p_v")
      var n_v = document.getElementById("n_v")
      var p_a = document.getElementById("p_a")
      var n_a = document.getElementById("n_a")
      var v_w = document.getElementById("v_w")
      var l_w = document.getElementById("l_w")
      var m_w = document.getElementById("m_w")
      var c_w = document.getElementById("c_w")
      var a_var = document.getElementById("a_var")
      var b_var = document.getElementById("b_var")
      var c_var = document.getElementById("c_var")
      var d_var = document.getElementById("d_var")
      
      var transformer_a = document.getElementById("transformer_a")
      var transformer_b = document.getElementById("transformer_b")
      var transformer_c = document.getElementById("transformer_c")
      var transformer_d = document.getElementById("transformer_d")
      var lamp_load_a = document.getElementById("lamp_load_a")
      var lamp_load_b = document.getElementById("lamp_load_b")
      var output_p_v = document.getElementById("output_p_v")
      var output_n_v = document.getElementById("output_n_v")

      var output_p_a = document.getElementById("output_p_a")
      var output_n_a = document.getElementById("output_n_a")

      var output_v_var = document.getElementById("output_v_var")
      var output_l_var = document.getElementById("output_l_var")
      var output_m_var = document.getElementById("output_m_var")
      var output_c_var = document.getElementById("output_c_var")
      
      var steps = document.getElementById("steps")
      
      var index = 1
      var voltageVal = []
      var I1Val = []
      var I2Val = []
      var I3Val = []
      
      var validConn = [p_mcb,n_mcb,p_v,n_v,p_a,n_a,v_w,l_w,m_w,c_w,a_var,b_var,c_var,d_var,transformer_a, transformer_b,transformer_c,transformer_d,
                      lamp_load_a, lamp_load_b,output_p_v,output_n_v,output_p_a,output_n_a,output_v_var,output_l_var,output_m_var,output_c_var]
      var arrChk = []
      var arrChkStore = []
      var tableArr = [ndl1, ndl2, ndl3]
      
      var state = 0;
      
      var flags3 = 0;
      var flags4 = 0;
      var flags5 = 0;
      var flags6 = 0;
      var flags7 = 0;
      
      const instance = jsPlumb.getInstance({
          container: cont
      })

      check.disabled = false
      
      instance.bind("ready", function () {
          instance.registerConnectionTypes({
              "positive": {
                  paintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 },
                  hoverPaintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 3.5 }
              },
              "negative": {
                  paintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 },
                  hoverPaintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 3.5 }
              }
          })
          instance.addEndpoint([p_mcb,p_v,p_a,l_w,m_w,c_w,output_p_v,output_p_a], {
              endpoint: "Dot",
              anchor: ["Center"],
              isSource: true,
              isTarget: true,
              paintStyle: { fill: "rgb(97,106,229)" },
              connectionType: "positive",
              maxConnections: 10,
              connectionsDetachable: true
          })
      
          instance.addEndpoint([n_mcb,n_v,n_a,v_w,output_n_v,output_n_a], {
      
              endpoint: "Dot",
              anchor: ["Center"],
              isSource: true,
              isTarget: true,
              paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 0 },
              connectionType: "negative",
              connectionsDetachable: true,
              maxConnections: 10,
          })
      
          instance.addEndpoint([a_var,c_var,transformer_a,transformer_c,lamp_load_a,output_l_var,output_m_var,output_c_var], {
      
              endpoint: "Dot",
              anchor: ["Center"],
              isSource: true,
              isTarget: true,
              paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
              connectionType: "positive",
              connectionsDetachable: true,
              maxConnections: 10,
          })
      
          instance.addEndpoint([b_var,d_var,transformer_b,transformer_d,lamp_load_b,output_v_var], {
      
              endpoint: "Dot",
              anchor: ["Center"],
              isSource: true,
              isTarget: true,
              paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
              connectionType: "negative",
              connectionsDetachable: true,
              maxConnections: 10
          })
      
      })
      
      window.onload = function fix() {
          document.body.style.zoom = "89%";
      }
      
      reset.onclick = function reset_conn(){
          window.location.reload();
      }



    function disconnect(num) {

    let node_list = [p_v,n_v,p_a,n_a,v_w,l_w,m_w,c_w,a_var,b_var,c_var,d_var,transformer_a,transformer_b,transformer_c,transformer_d,lamp_load_a,lamp_load_b,output_p_a,output_n_a, output_v_var,output_l_var,output_m_var,output_c_var]
                     instance.deleteConnectionsForElement(node_list[num])   

          }
      
      add.disabled=true;
      
      check.onclick = function MyCheck() {
      
          flags3 = 1;
      
        //   instance.addEndpoint([vp, v1p, v2p, v3p], {
        //       endpoint: "Dot",
        //       anchor: ["Top"],
        //       isSource: true,
        //       isTarget: true,
        //       paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        //       connectionType: "positive",
        //       connectionsDetachable: false,
        //       maxConnections: 1
        //   })
      
        //   instance.addEndpoint([vn, v1n, v2n, v3n], {
        //       endpoint: "Dot",
        //       anchor: ["Top"],
        //       isSource: true,
        //       isTarget: true,
        //       paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        //       connectionType: "negative",
        //       connectionsDetachable: false,
        //       maxConnections: 1
        //   })
      
        //   instance.addEndpoint([cvp, cv1p, cv2p, cv3p], {
        //       endpoint: "Dot",
        //       anchor: ["Top"],
        //       isSource: true,
        //       isTarget: true,
        //       connectionType: "positive",
        //       paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        //       connectionsDetachable: false,
        //       maxConnections: 1
        //   })
      
        //   instance.addEndpoint([cvn, cv1n, cv2n, cv3n], {
        //       endpoint: "Dot",
        //       anchor: ["Top"],
        //       isSource: true,
        //       isTarget: true,
        //       connectionType: "negative",
        //       paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        //       connectionsDetachable: false,
        //       maxConnections: 1
        //   })
      
          for (let i = 0; i < 19; i++) {

              if (instance.getConnections({ source: [validConn[i]], target: [validConn[i + 1]] })[0] != undefined) {

                  if (i % 2 == 0) {

                      arrChk.push(instance.getConnections({ source: [validConn[i]], target: [validConn[i + 1]] })[0])
      
                      try {

                          if ((instance.getConnections({ source: [validConn[i + 2]], target: [validConn[i + 3]] })[0] == undefined) & (i % 4 == 0)) {

                              if ((instance.getConnections({ source: [validConn[i + 3]], target: [validConn[i + 2]] })[0] == undefined) & (i % 4 == 0)) {

                                  arrChk.pop();
                              }
                          }
                      }
      
                      catch {

                          continue;

                      }
                  }
              }
      
              else if ((instance.getConnections({ source: [validConn[i + 1]], target: [validConn[i]] })[0] != undefined)) {

                  if (i % 2 == 0) {

                      arrChk.push(instance.getConnections({ source: [validConn[i + 1]], target: [validConn[i]] })[0])
      
                      try {

                          if ((instance.getConnections({ source: [validConn[i + 2]], target: [validConn[i + 3]] })[0] == undefined) & (i % 4 == 0)) {

                              if ((instance.getConnections({ source: [validConn[i + 3]], target: [validConn[i + 2]] })[0] == undefined) & (i % 4 == 0)) {

                                  arrChk.pop();
                              }
                          }
                      }
      
                      catch {
                          continue;
                      }
                  }
              }
          }
      
          if ((arrChk.length == 18) && (instance.getAllConnections().length == 18)) {
      
              window.alert("Right connections! Please choose the resistance values");
      
              if (voltageVal.length == 0) {

                  r1val.disabled = false;
                  r2val.disabled = false;
                  r3val.disabled = false;

              }
      
              arrChkStore = arrChk;
              arrChk = [];
          }
      
          else if (arrChk.length == 0) {
              
              window.alert("Please make connections!");  
          }
      
          else {
      
              window.alert("Invalid connections!");
              //window.location.reload()
          }
      }
      
      MCB.onclick = function toggle() {
      
      
        add.disabled = false;
          flags5 = 1;
      
          if (state == 0) {
      
              document.getElementById('MCB').src = 'images/PowerSupplyOn.png'
              PSval.disabled = false;
              PSdis.disabled = false;
              state = 1;
          }
      
          else if (state == 1) {
      
              document.getElementById('MCB').src = 'images/PowerSupplyOff.png'
              PSval.disabled = true;
              PSdis.disabled = true;
              PSdis.value = 0;
              PSval.value = 0;
              state = 0;
          }
      }
      
      var x = 18;
      function updateAmmeters() {
      
      
          r1 = parseFloat(r1val.value);
          r2 = parseFloat(r2val.value);
          r3 = parseFloat(r3val.value);
          ps = parseFloat(PSval.value);
      
          var Re = r1 + (r2 * r3) / (r2 + r3);
      
          var R = parseFloat(Re);
      
          var I1 = parseFloat(ps / R);
          var I2 = parseFloat((r3 / (r2 + r3)) * I1);
          var I3 = parseFloat((r2 / (r2 + r3)) * I1);
      
          var V1 = (I1 * r1)/2;
          var V2 = (I2 * r2)/2;
          var V3 = (I3 * r3)/2;
      
          var d1 = V1 * x;
          var d2 = V2 * x;
          var d3 = V3 * x;
      
          if (instance.getConnections({ source: [validConn[4]], target: [validConn[5]] })[0] == undefined) {
              if (instance.getConnections({ source: [validConn[16]], target: [validConn[17]] })[0] != undefined) {
                  d1 = V2 * x
                  tableArr = [ndl2, ndl1, ndl3]
              }
              else if (instance.getConnections({ source: [validConn[20]], target: [validConn[21]] })[0] != undefined) {
                  d1 = V3 * x
                  tableArr = [ndl3, ndl2, ndl1]
              }
          }
      
          if (instance.getConnections({ source: [validConn[8]], target: [validConn[9]] })[0] == undefined) {
              if (instance.getConnections({ source: [validConn[24]], target: [validConn[25]] })[0] != undefined) {
                  d2 = V1 * x
                  tableArr = [ndl2, ndl1, ndl3]
              }
              else if (instance.getConnections({ source: [validConn[28]], target: [validConn[29]] })[0] != undefined) {
                  d2 = V3 * x
                  tableArr = [ndl1, ndl3, ndl2]
              }
          }
      
          if (instance.getConnections({ source: [validConn[12]], target: [validConn[13]] })[0] == undefined) {
              if (instance.getConnections({ source: [validConn[32]], target: [validConn[33]] })[0] != undefined) {
                  d3 = V1 * x
                  tableArr = [ndl3, ndl2, ndl1]
              }
              else if (instance.getConnections({ source: [validConn[36]], target: [validConn[37]] })[0] != undefined) {
                  d3 = V2 * x
                  tableArr = [ndl1, ndl3, ndl2]
              }
          }
      
          ndl1.style.transform = "rotate(" + d1 + "deg)"
          ndl2.style.transform = "rotate(" + d2 + "deg)"
          ndl3.style.transform = "rotate(" + d3 + "deg)"
      }
      
      r1val.oninput = function fill1() {
          tIR1.value = r1val.value;
          flags4 = 1;
          ps.disabled = false
          //updateAmmeters();
      }
      
      r2val.oninput = function fill2() {
          tIR2.value = r2val.value;
          flags4 = 1;
          ps.disabled = false
          //updateAmmeters();
      }
      
      r3val.oninput = function fill3() {
          tIR3.value = r3val.value;
          flags4 = 1;
          ps.disabled = false
          //updateAmmeters();
      }
      
      PSval.oninput = function update() {
      
          add.disabled = false
      
          r1val.disabled = true;
          r2val.disabled = true;
          r3val.disabled = true;
      
          PSdis.value = PSval.value + ' V';
      
          if (arrChkStore.length == 8) {
              updateAmmeters();
          }
      }
      
      add.onclick = function AddToTable() {
      
          plot.disabled = false
      
          flags6 = flags6 + 1;
      
          let row = vtable.insertRow(index);
      
          let SNo = row.insertCell(0);
          let voltage = row.insertCell(1);
          let i1 = row.insertCell(2);
          let i2 = row.insertCell(3);
          let i3 = row.insertCell(4);
      
          SNo.innerHTML = index;
          voltage.innerHTML = PSval.value;
      
          i1.innerHTML = ((tableArr[0].style.transform.substring(7, ndl1.style.transform.indexOf("d"))) / 9).toPrecision(3);
          i2.innerHTML = ((tableArr[1].style.transform.substring(7, ndl2.style.transform.indexOf("d"))) / 9).toPrecision(3);
          i3.innerHTML = ((tableArr[2].style.transform.substring(7, ndl3.style.transform.indexOf("d"))) / 9).toPrecision(3);
          index = index + 1;
      
          voltageVal.push(voltage.innerHTML)
          I1Val.push(i1.innerHTML)
          I2Val.push(i2.innerHTML)
          I3Val.push(i3.innerHTML)
      }
      
      plot.onclick = function plotVal() {
      
          flags7 = 1;
      
          if (voltageVal.length >= 6) {
              var temp1 = document.getElementById("plotContiner")
              var temp2 = temp1.innerHTML
              temp1.innerHTML = temp2
              window.scrollTo({
                  top: 750,
                  left: 0,
                  behavior: 'smooth'
              });
      
      
      
              new Chart("myPlot", {
                  type: "line",
      
                  data: {
                      labels: voltageVal,
                      datasets: [{
                          label: "V1",
                          fill: false,
                          lineTension: 0.3,
                          borderColor: "blue",
                          data: I1Val
                      },
                      {
                          label: "V2",
                          fill: false,
                          lineTension: 0.3,
                          borderColor: "green",
                          data: I2Val
                      }]
                  },
      
                  options: {
                      maintainAspectRatio: false,
                      scales: {
                          y: {
                              beginAtZero: true,
                              title: {
                                  display: true,
                                  text: "Torque"
                              }
                          },
                          x: {
                              beginAtZero: true,
                              //suggestedMax:10,
                              type: "linear",
                              title: {
                                  display: true,
                                  text: "Speed"
                              }
                          }
                      }
                  }
              });
          }
          else{
              window.alert("Please enter atleast 6 obseravtions to the table.");
          }
      }
      
      prnt.onclick = function prntScr() {
          window.print();
      }
      
      
      function myFunction()  {
      
             document.getElementById("add").disabled=true;
      
      }
      
        /*   function highlight() {
          s1 = document.getElementById("s1");
          s2 = document.getElementById("s2");
          s3 = document.getElementById("s3");
          s4 = document.getElementById("s4");
          s5 = document.getElementById("s5");
          s6 = document.getElementById("s6");
          s7 = document.getElementById("s7");
      
          s1.style.color = "red";
      
          let conn = instance.getConnections();
      
          if (conn.length == 8) {
              s1.style.color = "black";
              s2.style.color = "red";
          }
      
          if (flags3 == 1) {
              s1.style.color = "black";
              s2.style.color = "black";
              s3.style.color = "red";
          }
      
          if (flags4 == 1) {
              s1.style.color = "black";
              s2.style.color = "black";
              s3.style.color = "black";
              s4.style.color = "red";
          }
      
          if (flags5 == 1) {
              s1.style.color = "black";
              s2.style.color = "black";
              s3.style.color = "black";
              s4.style.color = "black";
              s5.style.color = "red";
          }
      
          if (flags6 == 1) {
              s1.style.color = "black";
              s2.style.color = "black";
              s3.style.color = "black";
              s4.style.color = "black";
              s5.style.color = "black";
              s6.style.color = "red";
          }
      
          if (flags6 > 1) {
              s1.style.color = "black";
              s2.style.color = "black";
              s3.style.color = "black";
              s4.style.color = "black";
              s5.style.color = "black";
              s6.style.color = "black";
              s7.style.color = "red";
      
              prnt.disabled = false;
          }
      }  
               */
      
      window.setInterval(highlight, 100);