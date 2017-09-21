/**
 * Created by GeoBIM on 2017/9/20.
 */
define(['viewer','Cesium'],function(viewer,Cesium){
    //因为目前项目中用到了四中创建方式 --->普通创建模型   和时间关联的创建模型  和时间关联的创建线   以及绘制管道
    var ordinaryCreate = function(modelInfo){
        /*
        * modeInfo:
        * {
        *   position : {l:'',la:'',h:''},
        *   HeadingPitchRoll : {heading:'',pitch:'',roll:''},
        *   scale:'',
        *   url:''
        * }
        * */
        var entity = {};
        entity.modelInfo = modelInfo;
        var position = Cesium.Cartesian3.fromDegrees(modelInfo.position.l,modelInfo.position.la,modelInfo.position.h);
        var heading = modelInfo.HeadingPitchRoll.heading == undefined ?0 : Cesium.Math.toRadians(modelInfo.HeadingPitchRoll.heading );
        var pitch = modelInfo.HeadingPitchRoll.pitch == undefined ?0 : Cesium.Math.toRadians(modelInfo.HeadingPitchRoll.pitch );
        var roll =  modelInfo.HeadingPitchRoll.roll == undefined ?0 : Cesium.Math.toRadians(modelInfo.HeadingPitchRoll.roll );
        var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
        entity = viewer.entities.add({
            position : position,
            orientation : orientation,
            model : {
                uri : modelInfo.url,
                scale:modelInfo.scale == undefined ? 1 : modelInfo.scale
            }
        });
        entity.color = 'White';
        entity.alpha = 1;
        return entity;
    };
    var Time_relatedCreateModel = function(modelInfo){
        /*
        * modelInfo:
        * {
        *   position:'记录时间和位置的对应信息'，
        *   url:url,
        *   scale:'',
        *   start:'',//时间范围的开始
        *   stop:‘’
        * }
        *
        * */
        var position = modelInfo.position;
        var url = modelInfo.url;
        var scale = modelInfo.scale;
        var start = modelInfo.start;
        var stop = modelInfo.stop;
        var entity = viewer.entities.add({
            //Set the entity availability to the same interval as the simulation time.
            availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                start : start,
                stop : stop
            })]),
            //Use our computed positions
            position : position,
            //Automatically compute orientation based on position movement.
            orientation : new Cesium.VelocityOrientationProperty(position),
            //Load the Cesium plane model to represent the entity
            model : {
                uri : url,
                scale : scale
            }
        });
        entity.color = 'White';
        entity.alpha = 1;
        return entity;
    };
    var Time_relatedCreatePath = function(pathInfo){
        var position = pathInfo.position;
        var start = pathInfo.start;
        var stop = pathInfo.stop;
        var pathColor = pathInfo.color;
        var path =  viewer.entities.add({
            //Set the entity availability to the same interval as the simulation time.
            availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                start : start,
                stop : stop
            })]),
            //Use our computed positions
            position : position,
            //Automatically compute orientation based on position movement.
            orientation : new Cesium.VelocityOrientationProperty(position),
            path : {
                resolution : 1,
                material : new Cesium.PolylineGlowMaterialProperty({
                    glowPower : 0.1,
                    color : pathColor == undefined ? Cesium.Color.YELLOW : pathColor
                }),
                width : 5
            }
        });
        //path.color = 'White';
        return path;

    };
    var polyLineVolumeCreate = function(polyLineInfo,callback){
        var isConstant = false;
        var radius = polyLineInfo.radius;
        var color = polyLineInfo.color;
        var polyLine = viewer.entities.add({
            name : 'Red tube with rounded corners',
            polylineVolume : {
                positions : new Cesium.CallbackProperty(callback, isConstant) ,
                shape : computeCircle(radius),
                material : color == undefined ? Cesium.Color.GREEN : color

            }
        });
        //polyLine.color = 'White';
        return polyLine;
    };
    function computeCircle(radius) {
        var positions = [];
        for (var i = 0; i < 360; i++) {
            var radians = Cesium.Math.toRadians(i);
            positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)));
        }
        return positions;
    }
    return {
        ordinaryCreate : ordinaryCreate,
        Time_relatedCreateModel : Time_relatedCreateModel,
        Time_relatedCreatePath : Time_relatedCreatePath,
        polyLineVolumeCreate : polyLineVolumeCreate
    }
});