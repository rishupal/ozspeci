// import finalData from 'suburbWiseSpecies.js';
url = window.location.href;
val = url.split('data=').pop();
var finalData;
fetchLocationsBySuburb(val);


//function to fetch all locations of species. 
function fetchLocationsBySuburb(val){
  
  $.ajax({
  type: "GET",
  url: "https://j0uvsseb90.execute-api.ap-southeast-2.amazonaws.com/fetchlocations/" + val + "/" + 100,
  crossDomain: true,
  contentType: "application/json",
  success: function(data, status){
  finalData = data.data
  if (finalData == undefined){
    fetchLocationsBySuburb(val)
  }
  else{
      description(finalData);
      if (finalData[0].treatment!=""){
        /*calling treatment for species*/
      treatment(finalData);}
    console.log(finalData)
    
    plotData = jsonToGeoJson(finalData)
    /*passing plot data to plotmap*/
    plotMap(plotData)
   
  
    }
      

  }
  });
};

var pArr = $("#extra .container .row .12u #image");
var dArr = $("#extra .container .row .12u #cont");
/*#defining description function*/
function description(finalData){
    
    var image = finalData[0].image.split(' ').join('_')
    image ="images/"+ image+".jpg";
    $('#headr h2').html(finalData[0].commonName);
    var img=$("<img />").attr("src",image);
      img.appendTo($(pArr));
  
    $(dArr).html("<h3>Description:</h3><p>"+finalData[0].description+"</p>");

}
/*#defining treatment function*/
function treatment(finalData)
{ 
  if (finalData[0].treatment != undefined){
  treatment = finalData[0].treatment.split('_');
  var tArr = $("#extra .container .row .6u #treatment");
      
      $(tArr).append("<button type='button' class='collapsible'>Open Treatment</button>");
  /*$.each(treatment,function(i,item){*/
    $(tArr).append("<div class='content'><p>"+ treatment +"</br></p></div")
/*});*/
}
if (finalData[0].prevention != undefined){
    prevention = finalData[0].prevention.split('_');
  var tArr = $("#extra .container .row .6u #prevention");
        
      $(tArr).append("<button type='button' class='collapsible'>Open Prevention</button>");
  
  /*$.each(prevention,function(i,item){*/
    $(tArr).append("<div class='content'><p>"+ prevention +"</p></div>")
}
    /*});*/
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
    

}
/*#defining function to change json data to geojson*/
function jsonToGeoJson(finalData){
  var geojson = {
  type: "FeatureCollection",
  features: [],
  }
  for (i = 0; i < finalData.length; i++) {
    /*$.getJSON(finalData, function(raw){
    $.each(raw, function(index, data){*/
    geojson.features.push({
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [finalData[i].lng, finalData[i].lat]
    },
    "properties": {
      "eventDate": finalData[i].eventDate,
      "lat": finalData[i].lat,
      "lng": finalData[i].lng,
      "is_Dangerous":finalData[i].is_Dangerous,
      "description": finalData[i].description,
      "commonName":finalData[i].commonName,
      "locality":finalData[i].locality,
      "image":finalData[i].image,
      
    }
    });
  }
    return geojson
    };
/*#function take geojson data and plot map*/
function plotMap(geojson) {
   $('#headr #outer_map  h2').html("<center><br>Explore Different Locations for "+finalData[0].commonName+" in "+finalData[0].state +" </center>")
     mapboxgl.accessToken = 'pk.eyJ1IjoicmlzaHVwYWwwNSIsImEiOiJjanp0eG9mMTAwMDUyM210amx1OHZycGZ6In0.1xrOyO0qoTiRh110hkBvSw';

  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [145.46332,-37.814], // starting position [lng, lat]
    //center: [37.80, 144.00],
    
    zoom: 7 // starting zoom
    });
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
  },
  trackUserLocation: true

  }));
  // code from the next step will go here!
  geojson.features.forEach(function(marker) {
    //feature = geojson.features[0];
    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
    marker.properties.image = marker.properties.image.split(' ').join('_')
    el.style.backgroundImage = 'url(images/'+marker.properties.image+'.jpg)';
    el.style.width = '30px';
    el.style.height = '30px';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);

    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML('<div id="popup-container><img class="image fit" src= images/'+marker.properties.image+'.jpg  alt="" height="100" width="100" /> ' +'<H3>' + marker.properties.commonName + '</H3><p> Spotted on: ' + marker.properties.eventDate + '</p><p> Locality: ' + marker.properties.locality + '</p>'))
    .addTo(map);
  });
}
