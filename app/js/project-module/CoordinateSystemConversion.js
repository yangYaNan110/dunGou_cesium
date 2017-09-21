/**
 * Created by GeoBIM on 2017/9/20.
 */
define(['Cesium','viewer'],function(Cesium,viewer){//这里主要是对常用的坐标系转换的封装  项目里用到的转换主要有：  经纬和世界坐标转换   模型局部坐标和经纬坐标转换
    //经纬到世界坐标
    var DegreesToCartesian3 = function(l,la,h){
        return new Cesium.Cartesian3.fromDegrees(l,la,h);
    };
    //世界坐标到经纬
    var Cartesian3ToDegrees = function(Cartesian3){
        var wgs = {};
        var wgs84 = ellipsoid.cartesianToCartographic(Cartesian3);
        wgs['longitude'] = Cesium.Math.toDegrees(wgs84.longitude);
        wgs['latitude'] = Cesium.Math.toDegrees(wgs84.latitude);
        wgs['height'] =  wgs84.height;
        return wgs;
    };
    //模型局部到经纬
    var modelLocalToLLa = function(coordinateLocalArr){//传进来的是一个二维数组
        var arrWorld = [];
        for(var i=0;i<coordinateLocalArr.length;i++)
        {
            var x= coordinateLocalArr[i][0];
            var y= coordinateLocalArr[i][1];
            var z = coordinateLocalArr[i][2];
            var d=0;
            var ellipsoid = viewer.scene.globe.ellipsoid;
            var rotate = Cesium.Math.toRadians(d);//转成弧度
            var quat = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_Z, rotate); //quat为围绕这个z轴旋转d度的四元数
            var rot_mat3 = Cesium.Matrix3.fromQuaternion(quat);//rot_mat3为根据四元数求得的旋转矩阵
            var v = new Cesium.Cartesian3(x, y, z);//局部坐标
            var m = Cesium.Matrix4.fromRotationTranslation(rot_mat3, Cesium.Cartesian3.ZERO);//m2为旋转加平移的4x4变换矩阵，这里平移为(0,0,0)，故填个Cesium.Cartesian3.ZERO
            m = Cesium.Matrix4.multiplyByTranslation(m, v, m);//m = m X v
            var cart3 = ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-112.110693, 36.0994841, 10));//得到局部坐标原点的全局坐标
            var m1 = Cesium.Transforms.eastNorthUpToFixedFrame(cart3);//m1为局部坐标的z轴垂直于地表，局部坐标的y轴指向正北的4x4变换矩阵
            m=Cesium.Matrix4.multiplyTransformation(m1, m, m);//m = m X m1
            var xyz = Cesium.Matrix4.getTranslation(m,new Cesium.Cartesian3());//根据最终变换矩阵m得到xyz
            var wgs84 = ellipsoid.cartesianToCartographic(xyz);
            wgs84.longitude = Cesium.Math.toDegrees(wgs84.longitude);
            wgs84.latitude = Cesium.Math.toDegrees(wgs84.latitude);
            arrWorld.push([wgs84.longitude,wgs84.latitude,wgs84.height]);
        }
        return arrWorld;

    };
    return {
        DegreesToCartesian3:DegreesToCartesian3,
        Cartesian3ToDegrees:Cartesian3ToDegrees,
        modelLocalToLLa:modelLocalToLLa
    }

});