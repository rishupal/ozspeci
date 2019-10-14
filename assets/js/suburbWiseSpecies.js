


  //fetching value from other page
  url = window.location.href;
  val = url.split('data=').pop();
  //splittin value based on /
  var localData = val.split('/');
  var lat=parseFloat(localData[0]);
  var lng=parseFloat(localData[1]);
  var locality = localData[2];
  locality = locality.split('_').join(' ')
 /* var btnContainer = document.getElementById("myBtnContainer");
  var btns = btnContainer.getElementsByClassName("btn");
  var current = document.getElementsByClassName("active");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    
    });

  }
*/
  fetchSpeciesBySuburb(lat,lng,locality);
  
  /*else if(c=='dangerous'){

  }
  else if(c=='ndangerous'){

  }*/


var finalData;



function navigateToMap(val) {
  val = val.split(' ').join('_')
  base_url = 'visualizeMapPlot.html'
  new_url =  base_url + '?data=' + val;
  window.location.href = new_url;
}


function fetchSpeciesBySuburb(lat,lng,locality){

  $('#loading-image').show();

  
  $.ajax({
  type: "GET",
  url: "https://7c0qdup7cl.execute-api.ap-southeast-2.amazonaws.com/nearestSuburbStage/" + lat + "/"+lng+"/" + 100,
  crossDomain: true,
  contentType: "application/json",
  success: function(data, status){
  	finalData = data.data
    if (finalData == undefined){
      
    fetchSpeciesBySuburb(lat,lng,locality)
    }
    else if (locality.includes("VIC")){

  	   test(finalData,locality)
      }
      else{
        $(".grid-portfolio .container #add").html('<H2>Currently, We are working for Species in Victoria <br> Kindly Go Back and  Search for address in Victoria<br>Thanks for visiting!</H2>')
        }
        $('#loading-image').hide();
    
  		
	 
  }
});
}


function test(data,locality) 
{
	var imagesrc=[]
  var speciesNames=[]
  var speciesIndex=[]
  /*var pArr = $("#extra .container .row .4u .box p");*/

  var pArr = $(".grid-portfolio .container .row");
  data = data;
  speciesNames.push(data[0].commonName)
     speciesIndex.push(0)
     $.each(data, function(i, item){
        if(speciesNames.includes(item.commonName)) {
          var indexName = speciesNames.indexOf(item.commonName)
          var species = data[speciesIndex[indexName]]
          if(species.eventDate <= item.eventDate) {
            speciesIndex[indexName] = i
          }
        } else {
          speciesNames.push(item.commonName)
          speciesIndex.push(i)
        }
     })
    $(".grid-portfolio .container #add").html("<h1> Information of Spotted Species near "+ locality+"</h1>");
     
  $.each(speciesIndex,function(item,i){

    data[i].image = data[i].image.split(' ').join('_')
    if(data[i].is_Dangerous == 1){
      $(pArr[0]).append("<div class='col-md-4 col-sm-6'><div class='portfolio-item'><div class='thumb'> "+
      "<a href='images/"+data[i].image+".jpg' data-lightbox='image-1' style='color: white !important;'><div class='hover-effect'><div class='hover-content'></span>"+
      "<div class='commonName'><h1 style='color:#e5474b'><blink>"+data[i].commonName+"<span style='color:red' class='fa fa-warning'></blink></h1></div><p>Spotted Date: "+ data[i].eventDate+" </span><br/><span class='simple-btn' style='color: white !important;'><span class='continueExploringButton' id='"+ i +"'>continue exploring</span></span></p></div></a><div class='image'><img src='images/"+data[i].image+".jpg'></div></div></div></div>")
  }
  else{
    $(pArr[0]).append("<div class='col-md-4 col-sm-6'><div class='portfolio-item'><div class='thumb'>"+
      "<a href='images/"+data[i].image+".jpg' data-lightbox='image-1' style='color: white !important;'><div class='hover-effect'><div class='hover-content'></span>"+
      "<div class='commonName'><h1>"+data[i].commonName+"</h1></div><p>Spotted Date: "+ data[i].eventDate+" <br/><span class='simple-btn' style='color: white !important;'><span class='continueExploringButton' id='"+ i +"'>continue exploring</span></span></p></div></a><div class='image'><img src='images/"+data[i].image+".jpg'></div></div></div></div>")
  }
  	/*$.each(data,function(i,item){
  	 data[i].image = data[i].image.split(' ').join('_')
      imagesrc.push("images/"+data[i].image +".jpg") 
      $("#headr").html("<H2> Information of Spotted Species near "+ locality);
     
      if(data[i].is_Dangerous == 1){
          $(pArr[i]).html("<h1><center>"+data[i].commonName+"</center></h1>" + "<a>Spotted Date: "+ data[i].eventDate +"<br />" +"Distance From Location: "+ Math.round(data[i].distance)/1000+"kms </b> <div class='alert alert-danger'><strong>Dangerous!</strong> can indicate a potentially negative action.</div></a>"); 

      }
      else{
         $(pArr[i]).html("<H4><center>"+data[i].commonName+"</center></H4>" + "<b>Locality: </b>"+ data[i].locality +"<br />" + "<b>State: </b>"+ data[i].state +"<br />" +"<b>Spotted Date: </b>"+ data[i].eventDate +"<br />" +"<b>Distance From Location: </b>"+ Math.round(data[i].distance)/1000+"kms </b> <div class='alert alert-success'><strong style='color: green;'>Not Dangerous!</strong> Human friendly and adorable.</div>"); 

      }

      var img=$("<img />").attr("src",imagesrc[i]);
      img.appendTo($(pArr[i]));
  }

*/
  		});
    
}

var $links = $(".continueExploringButton")

  $("body").on("click",".continueExploringButton",function(e){ 
    specieName = (finalData[parseInt(e.target.id)].commonName)
    //console.log(testData[parseInt(e.target.id) - 1].commonName)
    navigateToMap(specieName)
});



