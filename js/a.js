$(document).ready(function(){

	// TODO
	/*
		1. Пустые клетки. Надо как-то решить
		2. Set min-width div
		3. Set max-width
	*/

	//!!! ненужный код! Нумерация
	var num_block = 0;
	$('.b_itemtile').each(function(){
		$(this).text(++num_block);
	});

	// основные параметры
	var count_col = 9;		// количество колонок
	var distance = 10;		// расстояние между ячейками

	var steck_length = [];	// длинна колонок

	// set size steck_length
	for (var i = 0; i < count_col; i++) {
		steck_length.push(0);
	};
	
	// set size div 1x1
	var single_size = ($('.tile_content').width()-distance*(count_col-1))/count_col;

	start_size_init();

	$('.tile_content').height( get_max_val(steck_length)*single_size + distance*get_max_val(steck_length) -  distance);

	// on resize window set new position divs
	$(window).resize(function(){
		// reset steck_length
		for (var i = 0; i < count_col; i++) {
			steck_length[i] = 0;
		};

		// set size div 1x1
		single_size = ($('.tile_content').width()-distance*(count_col-1))/count_col;

		start_size_init();

		$('.tile_content').height( get_max_val(steck_length)*single_size + distance*get_max_val(steck_length) -  distance);
	})

	

	// size initialization divs
	function start_size_init()
	{
		$('.b_itemtile').each(function(){
			var size = get_size_block( $(this) );
			$(this).css({
				'width':single_size*size[0]+distance*(size[0]-1),
				'height':single_size*size[1]+distance*(size[1]-1)
			});

			var pos = get_block_position( $(this) );

			$(this).css({
				'top': pos[0]+'px',
				'left': pos[1]+'px'
			});
		});
	};

	// get item block position
	// itm_block - this div
	function get_block_position( itm_block ){
		var min_index = steck_length.indexOf( get_min_val(steck_length) );
		var size = get_size_block( itm_block );
		var out = [];

		// если в одну колонку влезает
		if( size[0] == 1 )
		{
			out.push( steck_length[min_index] * ( single_size + distance ) );
			out.push( min_index*(single_size + distance) );
			steck_length[min_index] = steck_length[min_index] + size[1];
		
		// более чем в один блок
		} else {
			var time_steck_length = steck_length.concat(); 		//	временная переменная для хранения длинн
			var sub_max = get_max_val( time_steck_length.slice(min_index,min_index+size[0]) );

			while( out.length == 0 )
			{
				min_index = time_steck_length.indexOf( get_min_val(time_steck_length.slice(0,time_steck_length.length - size[0] + 1)) );
				var sub_max = get_max_val( time_steck_length.slice(min_index,min_index+size[0]) );

				if( sub_max != time_steck_length[min_index] ){
					time_steck_length[min_index] = time_steck_length[min_index] + 1;
					min_index = time_steck_length.indexOf( get_min_val(time_steck_length) );
				} else {
					out.push( time_steck_length[min_index] * ( single_size + distance ) );
					out.push( min_index*(single_size + distance) );
				}
			}

			sub_max = size[1] + steck_length[min_index];
			for (var i = min_index; i < min_index + size[0]; i++) {
				steck_length[i] = sub_max;
			};

		};

		
		return out;
	};


	// get array size block
	function get_size_block( itm_block )
	{
		if( itm_block.hasClass('b_itemtile_1_1') )
		{
			return [];
		};

		if( itm_block.hasClass('b_itemtile_1_2') )
		{
			return [];
		};

		if( itm_block.hasClass('b_itemtile_1_3') )
		{
			return [];
		};

		if( itm_block.hasClass('b_itemtile_1_4') )
		{
			return [1,4];
		};

		if( itm_block.hasClass('b_itemtile_2_1') )
		{
			return [2,1];
		};

		if( itm_block.hasClass('b_itemtile_2_2') )
		{
			return [2,2];
		};

		if( itm_block.hasClass('b_itemtile_2_3') )
		{
			return [2,3];
		};

		if( itm_block.hasClass('b_itemtile_2_4') )
		{
			return [2,4];
		};

		if( itm_block.hasClass('b_itemtile_3_1') ){
			return [3,1];
		};

		if( itm_block.hasClass('b_itemtile_3_2') )
		{
			return [3,2];
		};

		if( itm_block.hasClass('b_itemtile_3_3') )
		{
			return [3,3];
		};
	
		if( itm_block.hasClass('b_itemtile_3_4') )
		{
			return [3,4];
		};

		if( itm_block.hasClass('b_itemtile_4_1') )
		{
			return [4,1];
		};

		if( itm_block.hasClass('b_itemtile_4_2') )
		{
			return [4,2];
		};

		if( itm_block.hasClass('b_itemtile_4_3') )
		{
			return [4,3];
		};

		if( itm_block.hasClass('b_itemtile_4_4') )
		{
			return [4,4];
		};
	};


	// get min index of array
	function get_min_val( array_val ){
		var min = array_val[0];
		for (var i = 0; i <= array_val.length - 1; i++) {
			if( min > array_val[i] )
			{
				min = array_val[i];
			}
		};
		return min;
	}

	// get max index of array
	function get_max_val( array_val ){
		var max = array_val[0];
		for (var i = 0; i <= array_val.length - 1; i++) {
			if( max < array_val[i] )
			{
				max = array_val[i];
			}
		};
		return max;
	}

});
