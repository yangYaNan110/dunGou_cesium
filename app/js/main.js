var str = '../app/js/project-module/';
require.config({
    baseUrl : '../Source',
    paths:{
        'Cesium':'Cesium',
        'camera':str+'camera',
        'math':str+'math',
        'viewer':str+'vierwer',
        'createModel':str+'createModel',
        'modelAttr':str+'modelAttr',
        'CoordinateSystemConversion':str+'CoordinateSystemConversion',
        'time-position':str+'time-position'
    }

});


require(['Cesium','viewer','camera','createModel','CoordinateSystemConversion','modelAttr','time-position'],
    function(Cesium,viewer, camera,createModel,CoordinateSystemConversion,modelAttr,timePosition){
        viewer._cesiumWidget._creditContainer.style.display = 'none';
    //生成隧道模型
    var suiDao = createModel.ordinaryCreate(suiDaoInfo);
        //modelAttr.displayNo(suiDao);
    //把两根线的局部坐标转成经纬坐标
    var leftLineWorldCoordinate =CoordinateSystemConversion.modelLocalToLLa(leftLine);
    var rightLineWorldCoordinate = CoordinateSystemConversion.modelLocalToLLa(rightLine);


        var moveTime = 180;
        viewer.clock.multiplier =0.5;
        var leftStart =Cesium.JulianDate.fromDate(new Date());
        var leftStop = Cesium.JulianDate.addSeconds(leftStart, moveTime, new Cesium.JulianDate());
        var rightStart = leftStop;
        var rightStop = Cesium.JulianDate.addSeconds(leftStop, moveTime, new Cesium.JulianDate());
        viewer.timeline.zoomTo(leftStart, rightStop);
        var leftLinePositionTime =timePosition.time_position(leftLineWorldCoordinate,leftStart,moveTime);
        var rightLinePositionTime = timePosition.time_position(rightLineWorldCoordinate,rightStart,moveTime);
        //console.log(leftLinePositionTime);
        var leftPathInfo = {
            position:leftLinePositionTime,
            start:leftStart,
            stop:leftStop
            //color:Cesium.Color.GREEN
        };
        var rightPathInfo = {
            position:rightLinePositionTime,
            start:rightStart,
            stop:rightStop
        };
        //画出左右两根线
        var leftPath = createModel.Time_relatedCreatePath(leftPathInfo);
        var rightPath = createModel.Time_relatedCreatePath(rightPathInfo);


        //创建盾构机
        //var leftAndRightWorldCoordinate =  leftLineWorldCoordinate.concat(rightLineWorldCoordinate);
        //var leftAndRightPositionTime = timePosition.time_position(leftAndRightWorldCoordinate,leftStart,moveTime*2);

        dunGouInfo.position =leftLinePositionTime;
        dunGouInfo.start = leftStart;
        dunGouInfo.stop = leftStop;
        var dunGouBody = createModel.Time_relatedCreateModel(dunGouInfo);

        window.selectedEntity = dunGouBody;
        window.outDateEntity = dunGouBody;

        //controlTool(Cesium,viewModel,window.selectedEntity );

        //var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

        //handler.setInputAction(function (movement) {
        //    console.log(666)
        //    window.selectedEntity = suiDao;
        //    if(window.selectedEntity != window.outDateEntity){
        //        controlTool(Cesium,viewModel,window.selectedEntity );
        //    }
        //}, Cesium.ScreenSpaceEventType.LEFT_CLICK);








  



    camera.trackedEntity(suiDao);
    Sandcastle.finishedLoading();
});
