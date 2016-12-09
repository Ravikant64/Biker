<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<title>Bikers Club</title>
		<link rel="icon" type="image/x-icon" href="media/favicon.png" />

		<link href="css/master.css" rel="stylesheet">

		<!-- SWITCHER -->
		<link rel="stylesheet" id="switcher-css" type="text/css" href="assets/switcher/css/switcher.css" media="all" />
		<link rel="alternate stylesheet" type="text/css" href="assets/switcher/css/color1.css" title="color1" media="all" data-default-color="true"  />
		<link rel="alternate stylesheet" type="text/css" href="assets/switcher/css/color2.css" title="color2" media="all" />
		<link rel="alternate stylesheet" type="text/css" href="assets/switcher/css/color3.css" title="color3" media="all" />
		<link rel="alternate stylesheet" type="text/css" href="assets/switcher/css/color4.css" title="color4" media="all" />
		<link rel="alternate stylesheet" type="text/css" href="assets/switcher/css/color5.css" title="color5" media="all" />

		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	<body ng-app="blog">
		<!-- Loader -->
		<div id="page-preloader"><span class="spinner"></span></div>
		<!-- Loader end -->

		<?php include('header.php'); ?>

		<section class="status dark-bg dark-bg--status">
			<div class="container wow slideInRight" data-wow-delay="0.7s" data-wow-duration="1.5s">
				<div class="breadcumb">
					<a href="home.html" class="breadcumb__page no-decoration">Home</a>
					<span class="breadcumb__del no-decoration">&raquo;</span>
					<a href="blog.html" class="breadcumb__page no-decoration">BLOG</a>
				</div>
				<h2 class="title title--page"><span class="title__bold">BikerClub</span> Blog</h2>
			</div>
		</section><!--status-->

		<div ng-view></div>

		<section class="link">
			<div class="container">
				<div class="row">
					<div class="col-md-10 col-md-offset-1 col-xs-12">
						<div class="row">
							<div class="col-xs-4 wow zoomInLeft" data-wow-delay="0.7s" data-wow-duration="1.5s">
								<div class="link__phone">
									<div class="link__square triangle triangle--12">
										<span class="fa fa-mobile"></span>
									</div>
									<h3>PHONE</h3>
									<p>(100) 987 6540 <br />0800 123 4567</p>
								</div>
							</div>
							<div class="col-xs-4 wow zoomInUp" data-wow-delay="0.7s" data-wow-duration="1.5s">
								<div class="link__phone">
									<div class="link__square triangle triangle--12">
										<span class="fa fa-map-marker"></span>
									</div>
									<h3>ADDRESS</h3>
									<p>3638 Ground Avenue, Hill Station,<br/>Hollywood CA 00765</p>
								</div>
							</div>
							<div class="col-xs-4 wow zoomInRight" data-wow-delay="0.7s" data-wow-duration="1.5s">
								<div class="link__phone">
									<div class="link__square triangle triangle--12">
										<span class="fa fa-envelope-o"></span>
									</div>
									<h3>EMAIL</h3>
									<p>sales@bikerclub.com <br/>info@domain.com</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section><!--link-->

		<footer class='map-footer'>
			<div class="footer-contacts">
				<div class="container">
					<div class="row">
						<div class="col-xs-7 wow fadeInLeft" data-wow-delay="0.7s" data-wow-duration="1.5s">
							<div class="map">
								<script type="text/javascript" charset="utf-8" src="https://api-maps.yandex.ru/services/constructor/1.0/js/?sid=W-Xpe7AurTrL7tXe8sROgCD2phwBIWEj&amp;width=auto&amp;height=380&amp;lang=en_US&amp;sourceType=constructor"></script>
							</div>
						</div>
						<div class="col-xs-5 wow fadeInRight" data-wow-delay="0.7s" data-wow-duration="1.5s">
							<form action="/" method="post" class="quick-form">
								<h2 class="title"><span class="title__bold">Quick</span>Contact</h2>
								<div class="quick-input">
									<input type="text" name="text" placeholder="Full Name" />
									<div class="triangle-quick-input"></div>
								</div>
								<div class="quick-input">
									<input type="text" name="phone" placeholder="Phone#" />
									<div class="triangle-quick-input"></div>
								</div>
								<div class="quick-input">
									<textarea placeholder="Message" name="mess"></textarea>
									<div class="triangle-quick-input"></div>
								</div>
								<button type="submit" class="btn button button--red button--main">SEND MESSAGE</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div class="footer-bottom">
				<div class="container">
					<div class="row">
						<div class="col-xs-7">
							<div class="copyright wow fadeInLeft" data-wow-delay="0.7s" data-wow-duration="1.5s">
								<p>&copy; Copyrights 2015 by <span>Templines</span> | <span>BikerClub. </span> All rights reserved.</p>
							</div>
						</div>
						<div class="col-xs-5">
							<div class="social social--footer pull-right clearfix wow fadeInRight" data-wow-delay="0.7s" data-wow-duration="1.5s">
								<a href="#" class="social__one square">
									<span class="fa fa-twitter"></span>
								</a>
								<a href="#" class="social__one square">
									<span class="fa fa-facebook"></span>
								</a>
								<a href="#" class="social__one square">
									<span class="fa fa-google-plus"></span>
								</a>
								<a href="#" class="social__one square">
									<span class="fa fa-pinterest"></span>
								</a>
								<a href="#" class="social__one square">
									<span class="fa fa-instagram"></span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<a id="to-top" href="#header-top"><i class="fa fa-chevron-up"></i></a>
		</footer><!--map-footer-->
		<script src="js/jquery-1.11.3.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/modernizr.custom.js"></script>
		<!-- Angular -->
	    <script src="js/angular/angular.js"></script>
	    <script src="js/angular-animate/angular-animate.js"></script>
	    <script src="js/angular-resource/angular-resource.js"></script>
	    <script src="js/angular-route/angular-route.js"></script>
	    <!-- Angular-App-->
	    <script src="angular-app/angular-modal-service.js"></script>
	    <script src="angular-app/blog/blog.js"></script>
	    <!-- Bootstrap -->
	    <script src="js/angular-bootstrap/ui-bootstrap-tpls-2.3.0.min.js"></script>
	    <script src="js/angular-bootstrap/ui-bootstrap-tpls.js"></script>
	    <script src="js/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
	    <script src="js/angular-bootstrap/ui-bootstrap.js"></script>
	    <script src="js/angular-bootstrap/ui-bootstrap.min.js"></script>

		<!--Counter-->
		<script src="assets/rendro-easy-pie-chart/dist/jquery.easypiechart.min.js"></script>
		<script src="js/waypoints.min.js"></script>
		<script src="js/jquery.easypiechart.min.js"></script>
		<script src="js/classie.js"></script>
		<!--Switcher-->
		<script src="assets/switcher/js/switcher.js"></script>		
		<!--Owl Carousel-->
		<script src="assets/owl-carousel/owl.carousel.min.js"></script>		
		<!--bxSlider-->
		<script src="assets/bxslider/jquery.bxslider.min.js"></script>		
		<!-- jQuery UI Slider -->
		<script src="assets/slider/jquery.ui-slider.js"></script>		
		<!--Isotope-->
		<script src="assets/isotope/isotope.js"></script>
		<!--Slider-->
		<script src="assets/slider/jquery.ui-slider.js"></script>		
		<!--Fancybox-->
		<script src="assets/fancybox/jquery.fancybox.pack.js"></script>
		<!--Theme-->
		<script src="js/jquery.smooth-scroll.js"></script>
		<script src="js/wow.min.js"></script>
		<script src="js/jquery.placeholder.min.js"></script>
		<script src="js/theme.js"></script>
	</body>
</html>