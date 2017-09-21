/**
 * Created by PVer on 2017/9/18.
 */
define(['Cesium'],function(Cesium){
    var viewer = function(){
        return new Cesium.Viewer('cesium_output', {
            //imageryProvider:new Cesium.BingMapsImageryProvider({
            //    url:'https//dev.virtualearth.net',
            //    mapStyle:Cesium.BingMapsStyle.AERIAL
            //}),
            baseLayerPicker : true,
            skyAtmosphere : false,
            //timeline : false,
            navigationHelpButton : false,
            geocoder : false,
            homeButton : false,
            //animation : false,
            sceneModePicker : false
        });
    };
    return viewer();
});