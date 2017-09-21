/**
 * Created by GeoBIM on 2017/9/20.
 */
//tool control
function controlTool(Cesium,viewModel, entity, dom)
{
    if(Cesium == undefined) throw 'cesium is undefined';
    //var toolbar =  dom == undefined ? document.getElementById('toolbar') : dom;


    Cesium.knockout.track(viewModel);

    var toolbar = document.getElementById('toolbar');
    Cesium.knockout.applyBindings(viewModel, toolbar);
    //var controlArr = ['color','alpha', 'colorBlendMode','colorBlendAmount','','','','','',''];



    Cesium.knockout.getObservable(viewModel, 'color').subscribe(
        function(newValue) {
            entity.model.color = getColor(newValue, viewModel.alpha);
        }
    );

    Cesium.knockout.getObservable(viewModel, 'alpha').subscribe(
        function(newValue) {
            entity.model.color = getColor(viewModel.color, newValue);
        }
    );

    Cesium.knockout.getObservable(viewModel, 'colorBlendMode').subscribe(
        function(newValue) {
            var colorBlendMode = getColorBlendMode(newValue);
            entity.model.colorBlendMode = colorBlendMode;
            viewModel.colorBlendAmountEnabled = (colorBlendMode === Cesium.ColorBlendMode.MIX);
        }
    );

    Cesium.knockout.getObservable(viewModel, 'colorBlendAmount').subscribe(
        function(newValue) {
            entity.model.colorBlendAmount = parseFloat(newValue);
        }
    );

    Cesium.knockout.getObservable(viewModel, 'silhouetteColor').subscribe(
        function(newValue) {
            entity.model.silhouetteColor = getColor(newValue, viewModel.silhouetteAlpha);
        }
    );

    Cesium.knockout.getObservable(viewModel, 'silhouetteAlpha').subscribe(
        function(newValue) {
            entity.model.silhouetteColor = getColor(viewModel.silhouetteColor, newValue);
        }
    );

    Cesium.knockout.getObservable(viewModel, 'silhouetteSize').subscribe(
        function(newValue) {
            entity.model.silhouetteSize = parseFloat(newValue);
        }
    );

    function getColorBlendMode(colorBlendMode) {
        return Cesium.ColorBlendMode[colorBlendMode.toUpperCase()];
    }

    function getColor(colorName, alpha) {
        var color = Cesium.Color[colorName.toUpperCase()];
        return Cesium.Color.fromAlpha(color, parseFloat(alpha));
    }

}