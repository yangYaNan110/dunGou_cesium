/**
 * Created by PVer on 2017/9/18.
 */
define(['viewer'],function(viewer){
    var trackedEntity = function(entity){
        viewer.trackedEntity = entity;
    };
    var flyToDestination = function(DestinationPosition) {
        viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromDegrees(DestinationPosition.l, DestinationPosition.la, DestinationPosition.h)
        });
    };
    return {
        trackedEntity : trackedEntity,
        flyToDestination:flyToDestination
    }
});