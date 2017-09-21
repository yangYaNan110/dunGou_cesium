/**
 * Created by GeoBIM on 2017/9/20.
 */
var daoPanUrl = '../models/0816daotou.glb';
var dunGouUrl = '../models/0816qita.glb';
var suiDaoUrl = '../models/001obj.gltf';
var daoPanScale =0.001, dunGouScale = 0.001,suiDaoScale = 1;
var suiDaoInfo = {
    //-112.110693, 36.0994841, 10
    position :{l:-112.110693,la:36.0994841,h:10},
    HeadingPitchRoll : {heading:0,pitch:0,roll:0},
    scale:suiDaoScale,
    url:suiDaoUrl
};
var dunGouInfo =
 {

   url:dunGouUrl,
   scale:0.001
 };







//左线  右线的局部坐标
//左线
var leftLine = [
    [9.8000002 ,  2.5        , 13],
    [19.456249 ,  -264.03125 , 13],
    [45.706249 ,  -547.125   , 13],
    [55.112499 ,  -664.21875 , 21.429298],
    [66.800003 ,  -826.28125 , 21.993599],
    [76.050003 ,  -954.59375 , 22.431301],
    [90.987503 ,  -1166.875  , 23.097698],
    [133.1125  ,  -1745.7188 , 25.039001],
    [130.8625  ,  -2041.5    , 23.951],
    [146.2375  ,  -2217.6563 , 26.309101]
];
var rightLine = [
    [-7.499999, 2.5        ,  13],
    [2.15625  , -264.03125 ,  13],
    [28.40625 , -547.125   ,  13],
    [37.8125  , -664.21875 ,  21.429298],
    [49.500004, -826.28125 ,  21.993599],
    [58.750004, -954.59375 ,  22.431301],
    [73.6875  , -1166.875  ,  23.097698],
    [115.8125 , -1745.7188 ,  25.039001],
    [113.5625 , -2041.5    ,  23.951],
    [128.9375 , -2217.6563 ,  26.309101]
];



//..........
var viewModel = {
    color : 'Red',
    colors : ['White', 'Red', 'Green', 'Blue', 'Yellow', 'Gray'],
    alpha : 1.0,
    colorBlendMode : 'Highlight',
    colorBlendModes : ['Highlight', 'Replace', 'Mix'],
    colorBlendAmount : 0.5,
    colorBlendAmountEnabled : false,
    silhouetteColor : 'Red',
    silhouetteColors : ['Red', 'Green', 'Blue', 'Yellow', 'Gray'],
    silhouetteAlpha : 1.0,
    silhouetteSize : 2.0,
    daoPanSpeed : 0,
    daoPanRotationSpeeds : [0, 5, 10, 15, 20]
};

