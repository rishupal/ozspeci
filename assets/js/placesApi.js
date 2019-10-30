/*defining variable*/
var placeSearch, autocomplete, geocoder;
/*defining function to autocomplted*/
function initAutocomplete() {
  geocoder = new google.maps.Geocoder();
  autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('autocomplete')),
     /*autocomplete to country australia*/
      {/*types: ['(cities)'],*/componentRestrictions: {country: 'au'}});

  autocomplete.addListener('place_changed', fillInAddress);
}

/*defining function codeAddress to check valid address*/
function codeAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        alert(results[0].geometry.location);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
/*defining function to fill address*/
function fillInAddress() {
  var place = autocomplete.getPlace();
  locality = place.formatted_address
  console.log(place)
  /*fetching lat and lon to fetch nearest species*/
  lat = place.geometry.location.lat()
  lng = place.geometry.location.lng()
  locality = locality.split(' ').join('_')
  /*#navigate to differnt function*/
  navigate(lat,lng,locality);
  //   codeAddress(document.getElementById('autocomplete').value);
}

/*#navigate function fetch nearest species*/
function navigate(lat,lng,locality) {
  //data = data.split(' ').join('_')
  base_url = 'suburbwisespecies.html'
  new_url =  base_url + '?data=' + lat+'/'+lng+'/'+locality;
  window.location.href = new_url;
}

