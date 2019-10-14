
	url = window.location.href;
  val = url.split('data=').pop();
  var localData = val.split('/');
  var lat=parseFloat(localData[0]);
  var lng=parseFloat(localData[1]);
  var locality = localData[2];
  locality = locality.split('_').join(' ')
  var btnContainer = document.getElementById("myBtnContainer");
  var btns = btnContainer.getElementsByClassName("btn");
  var current = document.getElementsByClassName("active");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    
    });

  }


var finalData;


function navigateToMap(val) {
  val = val.split(' ').join('_')
  base_url = 'visualizeMapPlot.html'
  new_url =  base_url + '?data=' + val;
  window.location.href = new_url;
}

function fetchData(lat,lng,locality){
  $('#loading-image').show();

  
  $.ajax({
  type: "GET",
  url: "https://7c0qdup7cl.execute-api.ap-southeast-2.amazonaws.com/nearestSuburbStage/" + lat + "/"+lng+"/" + 60,
  crossDomain: true,
  contentType: "application/json",
  success: function(data, status){
  	if (data.data == undefined){

  	 fetchSpeciesBySuburb(lat,lng,locality)
    }
    else{
  		finalData = data.data
  	}
  	$('#loading-image').hide();
    /*if (finalData == undefined){

  	 fetchSpeciesBySuburb(lat,lng,locality)
    }
    else{
      
      test(finalData,locality)
      if (finalData.length <=6)
      {
        $('#extra').html('<H2>Currently, We are working for Species in Victoria <br> Kindly Go Back and  Search for address in Victoria<br>Thanks for visiting!</H2>')
      }

    }
  		
	}*/
}
});
}
var data = finalData;
function fetchAllData{
	fetchAllData(data,locality)
}

function fetchDangerousData{
	fetchDangerousData(data,locality)
}

function fetchNotDangerousData{
	fetchNotDangerousData(data,locality)
}



function fetchAllData(data,locality){
	
      
      test(data,locality)
      if (data.length <=6)
      {
        $('#extra').html('<H2>Currently, We are working for Species in Victoria <br> Kindly Go Back and  Search for address in Victoria<br>Thanks for visiting!</H2>')
      }

 }

function fetchDangerousData(data,locality){
	var imagesrc=[]
  var pArr = $("#extra .container .row .4u .box p");
  //var dArr = $("#extra .container .row .6u .box p");
  
  data = data;
  	$.each(data,function(i,item){
  	 data[i].image = data[i].image.split(' ').join('_')
      imagesrc.push("images/"+data[i].image +".jpg") 
      $("#headr").html("<H2> Information of Spotted Species near "+ locality);
     
      if(data[i].is_Dangerous == 1){
          $(pArr[i]).html("<H4><center>"+data[i].commonName+"</center></H4>" + "<b>Locality: </b>"+ data[i].locality +"<br />" + "<b>State: </b>"+ data[i].state +"<br />" +"<b>Spotted Date: </b>"+ data[i].eventDate +"<br />" +"<b>Distance From Location: </b>"+ Math.round(data[i].distance)/1000+"kms </b> <div class='alert alert-danger'><strong>Dangerous!</strong> can indicate a potentially negative action.</div>"); 

      }

      var img=$("<img />").attr("src",imagesrc[i]);
      img.appendTo($(pArr[i]));


  		});
    

}

function fetchNotDangerousData(data,locality){
	var imagesrc=[]
  var pArr = $("#extra .container .row .4u .box p");
  //var dArr = $("#extra .container .row .6u .box p");
  
  data = data;
  	$.each(data,function(i,item){
  	 data[i].image = data[i].image.split(' ').join('_')
      imagesrc.push("images/"+data[i].image +".jpg") 
      $("#headr").html("<H2> Information of Spotted Species near "+ locality);
     
      if(data[i].is_Dangerous != 1){
          $(pArr[i]).html("<H4><center>"+data[i].commonName+"</center></H4>" + "<b>Locality: </b>"+ data[i].locality +"<br />" + "<b>State: </b>"+ data[i].state +"<br />" +"<b>Spotted Date: </b>"+ data[i].eventDate +"<br />" +"<b>Distance From Location: </b>"+ Math.round(data[i].distance)/1000+"kms </b> <div class='alert alert-danger'><strong>Dangerous!</strong> can indicate a potentially negative action.</div>"); 

      }

      var img=$("<img />").attr("src",imagesrc[i]);
      img.appendTo($(pArr[i]));


  		});
    

}



function test(data,locality) 
{
	var imagesrc=[]
  var pArr = $("#extra .container .row .4u .box p");
  //var dArr = $("#extra .container .row .6u .box p");
  
  data = data;
  	$.each(data,function(i,item){
  	 data[i].image = data[i].image.split(' ').join('_')
      imagesrc.push("images/"+data[i].image +".jpg") 
      $("#headr").html("<H2> Information of Spotted Species near "+ locality);
     
      if(data[i].is_Dangerous == 1){
          $(pArr[i]).html("<H4><center>"+data[i].commonName+"</center></H4>" + "<b>Locality: </b>"+ data[i].locality +"<br />" + "<b>State: </b>"+ data[i].state +"<br />" +"<b>Spotted Date: </b>"+ data[i].eventDate +"<br />" +"<b>Distance From Location: </b>"+ Math.round(data[i].distance)/1000+"kms </b> <div class='alert alert-danger'><strong>Dangerous!</strong> can indicate a potentially negative action.</div>"); 

      }
      else{
         $(pArr[i]).html("<H4><center>"+data[i].commonName+"</center></H4>" + "<b>Locality: </b>"+ data[i].locality +"<br />" + "<b>State: </b>"+ data[i].state +"<br />" +"<b>Spotted Date: </b>"+ data[i].eventDate +"<br />" +"<b>Distance From Location: </b>"+ Math.round(data[i].distance)/1000+"kms </b> <div class='alert alert-success'><strong style='color: green;'>Not Dangerous!</strong> Human friendly and adorable.</div>"); 

      }

      var img=$("<img />").attr("src",imagesrc[i]);
      img.appendTo($(pArr[i]));


  		});
    
}

var $links = $("#extra .container .row .4u .box")

  $links.on("click",".button",function(e){ 
    specieName = (finalData[parseInt(e.target.id) - 1].commonName)
    //console.log(testData[parseInt(e.target.id) - 1].commonName)
    navigateToMap(specieName)
});
