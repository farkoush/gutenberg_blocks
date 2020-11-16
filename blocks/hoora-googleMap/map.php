<?php
class hooramat_map extends WP_Widget{

	public function __construct()
	{
		parent::__construct(false, $name = "هورامت نقشه", array("description" => "نمایش نقشه گوگل"));
	}
	public function form($instance){
		?>


    <?php
	public function view_simple($args, $instance){
		?>
		<div id="map" class="<?php echo $instance['map-height']; ?> shadow" style=" width: 100%;"></div>
		<script>
		function initMap() {
			var uluru = {lat: -25.363, lng: 131.044};
			var map = new google.maps.Map(document.getElementById('map'), {
				scrollwheel: false,
				zoom: <?php echo $instance['zoom'] ?>,
				center: {lat: <?php echo $instance['center_latitude'] ?>, lng: <?php echo $instance['center_longitude'] ?>},
			});
			<?php foreach ($instance['locations'] as $key => $location):?>
			var marker = new google.maps.Marker({
				position: {lat: <?php echo $location['location_latitude']; ?>, lng: <?php echo $location['location_longitude']; ?>},
				map: map,
				title: 'test',
				<?php if (!empty(trim($location['location_image'])))
					echo 'icon: "' . wp_get_attachment_image_src( $location['location_image'], 'small')[0] . '",';?>
			});
			<?php endforeach; ?>
		}
		</script>
		<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbiAiOzcETpszNnd4ghbDHomTSJg9iw-g&callback=initMap"></script>
		<?php
	}
}
add_action('widgets_init', function(){return register_widget("hooramat_map");});
?>
