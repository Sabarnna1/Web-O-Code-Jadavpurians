$(document).ready(function() {
                $('#message').waypoint(function(direction) {
                    $('#message').addClass("animate__animated animate__fadeInUp ")
                    console.log('I am 20px from the top of the window')
                }, {
                    offset: '75%'
                })
            });