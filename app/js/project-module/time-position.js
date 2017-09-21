/**
 * Created by GeoBIM on 2017/9/20.
 */
define(['Cesium'],function(Cesium){
    var time_position = function(coordinateArr,start,number){//coordinateArr是要和时间绑定的位置信息的二维数组
        var count = 0;
        var length = coordinateArr.length;
        var lh = number/(length-1);
        var property = new Cesium.SampledPositionProperty();
        for (var i = 0; i < length; i++) {
            count=lh*i;
            var time = Cesium.JulianDate.addSeconds(start, count, new Cesium.JulianDate());

            var position = Cesium.Cartesian3.fromDegrees(coordinateArr[i][0],coordinateArr[i][1] , coordinateArr[i][2]);
            property.addSample(time, position);
        }
        return property;
    }
    return {
        time_position:time_position
    }
});