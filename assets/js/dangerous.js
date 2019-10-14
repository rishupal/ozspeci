
fetchSpeciesBySuburb();

var finalData;

function navigateToMap(val) {
  val = val.split(' ').join('_')
  base_url = 'visualizeMapPlot.html'
  new_url =  base_url + '?data=' + val;
  window.location.href = new_url;
}

function fetchSpeciesBySuburb(){

  $('#loading-image').show();

  
  $.ajax({
  type: "GET",
  url: "https://wnb1h6gjli.execute-api.ap-southeast-2.amazonaws.com/deploy",
  crossDomain: true,
  contentType: "application/json",
  success: function(data, status){
  	finalData = data.data
    if (finalData == undefined){

  	 fetchSpeciesBySuburb()
    }
    else{
      
      test(finalData)
      if (finalData.length <=6)
      {
        $('#extra').html('<H2>Currently, We are working for Species in Victoria <br> Kindly Go Back and  Search for address in Victoria<br>Thanks for visiting!</H2>')
      }

    }
  		$('#loading-image').hide();
	}
});
}


function test(data) 
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
    $(".grid-portfolio .container #add").html("<h1> Information of Dangerous species in Victoria");
     
  $.each(speciesIndex,function(item,i){

    data[i].image = data[i].image.split(' ').join('_')
    
      $(pArr[0]).append("<div class='col-md-4 col-sm-6'><div class='portfolio-item'><div class='thumb'> "+
      "<a href='images/"+data[i].image+".jpg' data-lightbox='image-1' style='color: white !important;'><div class='hover-effect'><div class='hover-content'></span>"+
      "<div class='commonName'><h1 style='color:#e5474b'><blink>"+data[i].commonName+"<span style='color:red' class='fa fa-warning'></blink></h1></div><p><span class='simple-btn' style='color: white !important;'><span class='continueExploringButton' id='"+ i +"'>continue exploring</span></span></p></div></a><div class='image'><img src='images/"+data[i].image+".jpg'></div></div></div></div>")
  
  	
  		});
    
}

var $links = $(".continueExploringButton")

  $("body").on("click",".continueExploringButton",function(e){ 
    specieName = (finalData[parseInt(e.target.id)].commonName)
    //console.log(testData[parseInt(e.target.id) - 1].commonName)
    navigateToMap(specieName)
});



