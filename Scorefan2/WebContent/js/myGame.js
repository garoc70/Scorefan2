angular.module('myGame', ['ui.bootstrap']);
angular.module('myGame').controller('gameCtrl', function($scope) {

	$scope.team1 = 'Team 1';
	$scope.team2 = 'Team 2';
	$scope.gameLoc = '';	
	$scope.gameDay=new Date();
	
	$scope.team1Score=5;
	$scope.team2Score=7;
	$scope.inning=4;
	$scope.inningHalf='top';
	$scope.topOfInning = false;
    $scope.bases=0;
	$scope.outs=2;
	$scope.edit = true;
	$scope.firstBase = false;
	$scope.secondBase = false;
	$scope.thirdBase = false;
	
	$scope.count=
		 {
			 balls: 3,
			 strikes: 2
		 };
	 
	$scope.secondBaseOn = "fa fa-lg fa-square fa-rotate-60";
	$scope.secondBaseOff = "fa fa-lg fa-square fa-rotate-60 color:yellow";
	
/*
 *  Date Picker functions
 */
	
	
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  
  	  
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };

  // Time
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };
  
  
  /*
   *  Clear the count when the user pushes the button or the inning is changed.
   */
    $scope.clearCount = function() {
  	  $scope.count.balls = 0;
  	  $scope.count.strikes = 0;
    };
  
    $scope.changeBalls = function(amount) {
    	$scope.count.balls+=amount;
    	console.log("changing count: Balls = " + $scope.count.balls);
    	if ($scope.count.balls <0) {
    		$scope.count.balls = 0;
    	}
    	if ($scope.count.balls > 4) {
    		$scope.count.balls = 0;
    	}
    		
    };
    
    $scope.toggleBase = function(base) {
    	console.log("Togglebase called with input " + base);
   	  if (base == 1) {
  		$scope.firstBase=!$scope.firstBase;  
  	  }
   	  else if (base == 2) {
  		  $scope.secondBase=!$scope.secondBase;
  	  }
      else if (base == 3) {
  		  $scope.thirdBase=!$scope.thirdBase;
  	  };	  

    
    };

    $scope.changeInning = function(direction) {
    	console.log("changing inning: dir = " + direction + "inning was" + $scope.inning + "top = " + $scope.topOfInning);
    	
    	if (direction == "up") {
    		// See if we are just moving to the bottom of the inning or to the next inning
    		if (!$scope.topOfInning) {
    			$scope.inning++;
    		}
    	}
    	else {
    		if ($scope.topOfInning) {
    			$scope.inning--;
    		}		
    	}
    	 
    	// True going up or down
    	$scope.topOfInning = !$scope.topOfInning;
    	clearCount();
    };
      

      
    
    
    	
});