$(document).ready(function() {
  "use strict"
  //CREO EL EVENTO AL PULSAR EL BOTON CON LA CLASE DENUNCIA QUE LLAME A LA FUNCION GEOLOCALIZAR
  $(".denuncia").on("click", function (event) {
    Geolocalizar();
  });

  let map, infoWindow , marker;
  // DEFINO LA FUNCION GEOLOCALIZAR QUE CONSUME DE LA API DE GOOGLE MAPS PARA OBTENER LAS COORDENADAS Y CREAR EL POINT EN EL MAPA
  function Geolocalizar() {
    map = new google.maps.Map(document.getElementById('mapa'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 15
    });
    infoWindow = new google.maps.InfoWindow;

    // INTENTA GEOLOCALIZAR SI EL NAVEGADOR LO PERMITE
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        //GUARDO EN LOS INPUT DEL FORM LA LAT Y LNG
        document.getElementById("inputLat").value = pos.lat;
        document.getElementById("inputLng").value = pos.lng;
        infoWindow.setPosition(pos);
        infoWindow.setContent('Estoy Aqui');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
        //LLAMO A LA FUNCION CON LOS RESULTADOS
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // SI EL NAVEGADOR NO SOPORTA LA GEOLOCALIZACION, MUESTRO EL MAPA CON EL MENSAJE
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: El servicio de geolocalización falló.' :
      'Error: Tu navegador no soporta la geolocalización.');
      infoWindow.open(map);
    }

  });
