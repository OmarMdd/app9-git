
//Hide Pause Initially
$('#pause').hide();


initAudio($('#playlist li:first-child'));

function initAudio(element){
	var song = element.attr('song');
	var title = element.text();
	var cover = element.attr('cover');
	var artist = element.attr('artist');
	
	
	audio = new Audio('media/' + song);
	
	if(!audio.currentTime){
		$('#duration').html('0.00');
	}
	
	$('#audio-player .title').text(title);
	$('#audio-player .artist').text(artist);
	
	
	$('img.cover').attr('src','images/covers/' + cover);
	
	$('#playlist li').removeClass('active');
	element.addClass('active');
}



$('#play').click(function(){
	audio.play();
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	showDuration();
});


$('#pause').click(function(){
	audio.pause();
	$('#pause').hide();
	$('#play').show();
});


$('#stop').click(function(){
	audio.pause();
	audio.currentTime = 0;
	$('#pause').hide();
	$('#play').show();
	$('#duration').fadeOut(400);
});


$('#playlist li').click(function (){
	audio.pause();
	initAudio($(this));
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	audio.play();
	showDuration();
});


$('#volume').change(function(){
	audio.volume = parseFloat(this.value / 10);
});


function showDuration(){
	$(audio).bind('timeupdate', function(){
		
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt((audio.currentTime / 60) % 60);
		
		if (s < 10){
			s = '0' + s;
		}
		$('#duration').html(m + ':' + s);
		var value = 0;
		if (audio.currentTime > 0){
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		$('#progress').css('width', value+'%');
	});
}
