angular.module('myGame', ['ui.bootstrap']);
angular.module('myGame').controller('gameCtrl', function($scope) {

	// Things to add:
	// Clearcount button
	// New game button
	// Notification options
	// Change settings to be menu or slide away
	// Scoreboard cleanup
	//   Alignment
	//   Graphics
	//   Counter alignment
	// Make counters configurable based on scoreboard type
	// Move Datepicker to other file
	// add time picker
	
	
	$scope.team1 = 'Team 1';
	$scope.team2 = 'Team 2';
	$scope.gameLoc = 'MM2';	
	$scope.gameDay=new Date();
	
	$scope.team1Score=0;
	$scope.team2Score=0;
	$scope.homeTeam='Team 2';
	
	$scope.inning=1;
	$scope.inningHalf='top';
	$scope.topOfInning = true;
    $scope.bases=0;
	$scope.outs=0;
	$scope.firstBase = false;
	$scope.secondBase = false;
	$scope.thirdBase = false;

	$scope.showSBMinimal= true;
	$scope.homeTeam1 = false;

	$scope.changeSBType = function() {
		if ($scope.scoreBoardType.name == "Minimal") {
			$scope.showSBMinimal = true;
		}
		else {
			$scope.showSBMinimal = false;
		}

	};
	
	$scope.edit = true;

	$scope.count= {
			 balls: 3,
			 strikes: 2
		 };
	 
    $scope.scoreBoardTypes = [
             {name:'Regular'},
             {name:'Minimal'}
          ];
                            
    $scope.scoreBoardType = $scope.scoreBoardTypes[1]; // Minimal
                            
	
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
//    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
   return false;
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
    	if ($scope.count.balls > 3) {
    		$scope.count.balls = 0;
    	}    		
    };

    $scope.changeStrikes = function(amount) {
    	$scope.count.strikes+=amount;
    	console.log("changing count: Strikes = " + $scope.count.strikes);
    	if ($scope.count.strikes <0) {
    		$scope.count.strikes = 0;
    	}
    	if ($scope.count.strikes > 2) {
    		$scope.count.strikes = 0;
    	}    		
    };

    $scope.changeOuts = function(amount) {
    	$scope.outs+=amount;
    	console.log("changing outs: Outs = " + $scope.outs);
    	if ($scope.outs <0) {
    		$scope.outs = 0;
    	}
    	if ($scope.outs > 3) {
    		$scope.outs = 0;
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
    	
    	if (direction == 1) {
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
    	 
    	if ($scope.inning <= 0) {
    		$scope.inning = 1;
    	}
    	// True going up or down
    	$scope.topOfInning = !$scope.topOfInning;
    	clearCount();
    };
      

    $scope.changeVisitorScore = function(amount) {
     if ($scope.homeTeam == $scope.team1) {
    	 $scope.team2Score+=amount;
     }
     else {
    	 $scope.team1Score+=amount;    	 
     };
    };
    
    $scope.changeHomeTeam = function() {
    	console.log( ($scope.homeTeam == $scope.team1) ? 'Team 1 is home' : 'Team 1 is not home' );
    	if ($scope.homeTeam == $scope.team1){
    		$scope.homeTeam1 = true;
    	}
    	else {
    		$scope.homeTeam1 = false;
    	}
    };
    
    
    $scope.changeHomeScore = function(amount) {
     if ($scope.homeTeam == $scope.team1) {
    	 $scope.team1Score+=amount;
     }
     else {
    	 $scope.team2Score+=amount;
     };
    };
    
    $scope.getHomeTeamScore = function() {
    	if ($scope.homeTeam1) {
    		return $scope.team1Score;
    	}
    	else {
    		return $scope.team2Score;
    	}
    };
    
    $scope.getVisitorTeamScore = function() {
    	if ($scope.homeTeam1) {
    		return $scope.team2Score;
    	}
    	else {
    		return $scope.team1Score;
    	}
    	
    };
    
    
});