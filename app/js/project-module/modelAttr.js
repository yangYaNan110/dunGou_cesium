/**
 * Created by GeoBIM on 2017/9/20.
 */
define(['viewer','Cesium'],function(viewer,Cesium){
    var getColor = function(colorName) {
        var color = Cesium.Color[colorName.toUpperCase()];
        return Cesium.Color.clone(color);
    };
    var getAlpha = function(colorName, alpha) {
        var color = Cesium.Color[colorName.toUpperCase()];
        return Cesium.Color.fromAlpha(color, parseFloat(alpha));
    };

    //light
    var light = function(entity,lightColor){
        entity.color = lightColor;
        entity.model.color =getColor(lightColor);
    };
    var cancelLight = function(entity,normalColor){
        entity.color = normalColor;
        entity.model.color =getColor(normalColor);
    };
    //display  show
    var show = function(entity){
        if(entity != undefined) return;
        viewer.entities.add(entity);
    };
    var displayNo = function(entity){
        if(entity == undefined) return;
        viewer.entities.remove(entity);
    };
    //alpha
    var alpha = function(entity,alpha){
        entity.alpha = alpha;
        entity.model.color =getAlpha(entity.color,alpha);
    };
    return {
        light:light,
        cancelLight:cancelLight,
        show:show,
        displayNo:displayNo,
        alpha:alpha
    }
});