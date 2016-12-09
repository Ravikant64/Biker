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
		<script src="//oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="//oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	<body ng-app="user">
		<!-- Loader -->
		<div id="page-preloader"><span class="spinner"></span></div>
		<!-- Loader end -->

		<!-- Start Switcher -->
		<?php include('header.php'); ?>
		
		<section class="status dark-bg dark-bg--status">
			<div class="container wow slideInRight" data-wow-delay="0.7s" data-wow-duration="1.5s">
				<div class="breadcumb">
					<a href="index.html" class="breadcumb__page no-decoration">Home</a>
					<span class="breadcumb__del no-decoration">&raquo;</span>
					<a href="ride.php" class="breadcumb__page no-decoration">Ride</a>
				</div>
				<h2 class="title title--page"><span class="title__bold">BikerClub</span> Sign Up</h2>
			</div>
		</section><!--status-->
		<div ng-view></div>
		
		<footer class="home-footer">
			<div class="footer-logo">
				<div class="container">
					<div class="row">
						<div class="col-xs-4 wow slideInLeft" data-wow-delay="0.7s" data-wow-duration="1.5s">
							<a href="index.html" class="logo logo--home">
								<span class="logo__moto">
									<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width='50px' x="0px" y="0px"
										viewBox="0 0 337.227 337.227" style="enable-background:new 0 0 337.227 337.227;" xml:space="preserve">
										<g>
											<g>
												<path d="M214.517,164.668c2.176-2.377,2.486-5.635,0.685-7.283c-1.795-1.643-5.015-1.05-7.19,1.327
													l-3.742,4.09c2.665,1.795,5.156,3.459,7.413,4.96L214.517,164.668z"/>
												<path d="M225.395,170.107c2.176-2.377,2.486-5.635,0.685-7.283c-1.795-1.643-5.015-1.05-7.19,1.327
													l-4.775,5.216c3.41,2.246,6.037,3.943,7.528,4.835L225.395,170.107z"/>
												<path  d="M236.273,175.546c2.176-2.377,2.486-5.635,0.685-7.283c-1.795-1.643-5.015-1.05-7.19,1.327
													l-4.873,5.325c2.524,0.245,6.369,0.555,11.128,0.897L236.273,175.546z"/>
												<path  d="M176.742,144.092c7.887,5.401,16.682,11.395,24.476,16.649l5.075-5.075
													c0,0-10.758-7.321-20.271-13.832C183.231,142.232,180.158,142.96,176.742,144.092z"/>
												<path d="M90.114,233.755c2.132-4.493,5.907-14.506,4.96-22.42c-1.039-1.256-4.835-5.27-16.85-14.539
													c1.719,3.971,2.681,8.349,2.681,12.95c0,18.025-14.609,32.634-32.634,32.634s-32.634-14.609-32.634-32.634
													s14.609-32.634,32.634-32.634c1.452,0,2.872,0.125,4.27,0.31c-6.505-5.189-11.857-9.964-15.964-14.462
													C15.583,168.192,0,187.126,0,209.747c0,26.657,21.609,48.272,48.272,48.272C66.183,258.018,81.782,248.239,90.114,233.755z"/>
												<path  d="M51.138,188.279c-0.946-0.125-1.882-0.288-2.861-0.288c-11.999,0-21.756,9.758-21.756,21.756
													c0,11.999,9.758,21.756,21.756,21.756s21.756-9.758,21.756-21.756c0-2.91-0.593-5.673-1.637-8.213l-11.52,14.876
													c-2.072,2.681-5.211,4.215-8.61,4.215c-2.426,0-4.727-0.789-6.652-2.274c-4.743-3.677-5.613-10.519-1.942-15.262L51.138,188.279z"
													/>
												<path d="M286.236,155.356c-16.975,0-31.971,8.327-41.239,21.087c7.968,0.538,17.035,1.115,25.738,1.648
													c4.601-2.529,9.883-3.976,15.501-3.976c17.797,0,32.226,14.43,32.226,32.226s-14.43,32.226-32.226,32.226
													c-9.883,0-18.71-4.46-24.623-11.46c-7.49-2.219-16.361-4.64-24.236-6.239c6.26,21.076,25.754,36.463,48.859,36.463
													c28.163,0,50.991-22.828,50.991-50.991S314.394,155.356,286.236,155.356z"/>
												<path  d="M48.261,111.599c7.044-5.493,16.605-11.025,30.029-16.421l9.078-15.969l-12.537,5.668
													C59.808,93.992,52.204,103.821,48.261,111.599z"/>
												<path d="M301.884,101.303c-0.005,0-0.011,0-0.011,0c-3.601-0.179-7-0.267-10.204-0.267
													c-16.807,0-28.267,2.328-36.034,5.238c-6.967,7.212-25.052,25.08-33.679,25.504c-0.044,0-0.615,0.016-0.664,0.016
													c-10.236,0-44.492-11.449-45.949-11.939c-1.066-0.359-1.806-1.338-1.849-2.458c-0.049-1.126,0.598-2.159,1.632-2.611l13.543-5.901
													c-3.709-3.753-5.771-4.183-5.771-4.183c-17.759-9.127-43.567-10.378-56.398-10.378c-4.857,0-7.854,0.179-7.854,0.179
													c0.092-1.779-2.029-2.42-5.156-2.42c-8.224,0-23.399,4.46-23.399,4.46c-6.103,2.11-11.422,4.248-16.203,6.391
													c-14.626,6.549-23.557,13.152-29.447,19.298c-4.895,5.107-7.751,9.899-10.106,14.087c-4.003,7.12-2.66,14.196,8.643,25.46
													c4.248,4.237,9.926,9.083,17.264,14.745c0.713,0.549,1.414,1.093,2.159,1.659c0.131,0.098,0.245,0.19,0.37,0.288l-1.169,1.512
													l-0.495,0.636l-1.67,2.148l-1.311,1.697l-3.535,4.569L43.268,203.66c-2.6,3.361-1.985,8.186,1.371,10.786
													c1.403,1.082,3.057,1.61,4.705,1.61c2.295,0,4.569-1.023,6.086-2.981l11.346-14.647l3.508-4.531l1.523-1.964l1.664-2.154
													l0.294-0.381l1.371-1.768c0.136,0.098,0.245,0.185,0.375,0.283c0.767,0.571,1.452,1.093,2.176,1.637
													c9.872,7.446,15.49,12.243,18.612,15.218c3.845,3.671,3.998,4.645,3.998,4.645c2.268,12.352-5.891,27.989-5.891,27.989
													s86.797,0,96.543,0s13.598-5.439,13.598-5.439s6.57-8.159,12.238-16.317c0.968-1.398,3.465-1.98,6.929-1.98
													c3.361,0,7.653,0.56,12.341,1.43c6.695,1.246,14.196,3.138,21.109,5.08c2.736,0.767,5.347,1.528,7.8,2.268
													c8.637,2.594,14.979,4.765,14.979,4.765l0.016-0.103c2.002,0.609,4.085,1.028,6.282,1.028c12.031,0,21.783-9.752,21.783-21.783
													c0-11.514-8.958-20.842-20.271-21.631l0.027-0.152c0,0-6.565-0.381-15.577-0.93c-2.589-0.158-5.374-0.332-8.273-0.511
													c-7.283-0.457-15.213-0.968-22.3-1.458c-3.742-0.261-7.234-0.511-10.269-0.745c-5.869-0.457-10.013-0.848-10.731-1.088
													c-0.027-0.011-0.12-0.065-0.152-0.082c-0.392-0.163-1.294-0.685-2.556-1.469c-1.828-1.131-4.384-2.79-7.511-4.852
													c-0.767-0.506-1.605-1.066-2.426-1.61c-2.317-1.539-4.797-3.198-7.413-4.96c-1.077-0.723-2.159-1.452-3.263-2.197
													c-15.164-10.236-32.08-21.881-32.08-21.881c5.608-2.497,10.389-4.177,14.528-5.243c4.068-1.044,7.517-1.496,10.487-1.496
													c9.856,0,14.506,4.841,19.684,8.436c2.774,1.925,5.684,2.567,8.327,2.567c5.287,0,9.518-2.567,9.518-2.567
													C316.793,101.64,302.347,101.303,301.884,101.303z M145.669,183.84l19.01-16.921c2.252-1.996,5.684-1.795,7.68,0.446
													c1.996,2.246,1.8,5.684-0.446,7.68l-16.845,14.995L145.669,183.84z M148.361,156.041c2.246-1.996,5.684-1.795,7.68,0.446
													c1.996,2.246,1.8,5.684-0.446,7.68l-16.915,15.061l-9.399-6.201L148.361,156.041z M188.23,185.924l-16.78,14.936l-9.399-6.201
													l18.939-16.861c2.252-1.996,5.678-1.795,7.68,0.446C190.672,180.49,190.476,183.927,188.23,185.924z"/>
												<path d="M221.288,129.08l0.005-0.027l0.386-2.703c1.692-0.082,4.406-1.55,7.647-3.845
													c2.616-1.855,5.575-4.253,8.615-6.902c0.044-0.038,0.087-0.076,0.125-0.109c0.609-0.528,1.213-1.055,1.822-1.599
													c-0.218,0.054-0.479,0.109-0.8,0.152c-0.908,0.125-2.312,0.201-4.64,0.201c-0.027,0-0.044,0-0.071,0
													c-8.964,0-26.885-1.061-35.653-1.621c-1.474-0.092-2.66-0.169-3.53-0.228c-0.315-0.022-0.62-0.044-0.843-0.054l-1.974,0.859
													l-8.528,3.72c4.096,1.3,9.013,2.807,13.957,4.232c1.284,0.37,2.545,0.723,3.818,1.077c3.987,1.104,7.816,2.089,11.166,2.828
													c2.562,0.566,4.765,0.957,6.527,1.142c0.696,0.076,1.436,0.169,1.964,0.169v2.692v0.016H221.288z"/>
											</g>
										</g>
									</svg>
								</span>
								<h2 class="logo__title">
									BIKER<span>Club</span>
								</h2>
							</a>
						</div>
						<div class="col-xs-8 wow slideInRight" data-wow-delay="0.7s" data-wow-duration="1.5s">
							<div class="social social--footer social--footer-home pull-right clearfix">
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
			</div><!--footer-logo-->

			<div class="footer-main-home dark-bg">
				<div class="container">
					<div class="row">
						<div class="col-md-3 col-xs-6 wow slideInLeft" data-wow-delay="0.7s" data-wow-duration="2.5s">
							<div class="footer-main-home__block equal-height-item">
								<h2 class="footer-main-home__title">about club</h2>
								<p class="text text--footer-main-home">Nunc molestie sapien tempor placerat crasd
									et lectus. Etiam sit amet turpis. Suspendisse
									se et erat. Proin a ipsum vitae orci port dom tristiq ue nam. Class aptent taciti sociosque sodales feugiat nulla lorem ipsum dolor ipsu
									sit amet consectetur adipisicing.</p>
								<a href="about.html" class="btn button button--red button--main">PURCHASE</a>
							</div>
						</div>
						<div class="col-md-3 col-xs-6 wow slideInUp" data-wow-delay="0.7s" data-wow-duration="1.5s">
							<div class="footer-main-home__block equal-height-item footer-main-home__block--margin">
								<h2 class="footer-main-home__title">Upcoming events</h2>
								<div class="footer-main-home__event clearfix">
									<div class="event-num triangle pull-right">29</div>
									<div class="footer-main-home__event-text">
										<h3><a class="no-decoration" href="article.html">Annual Race Day</a></h3>
										<p class="text text--footer-main-home">3 days Event. Starting March 29th</p>
									</div>
								</div>
								<div class="footer-main-home__event clearfix">
									<div class="event-num triangle pull-right">5</div>
									<div class="footer-main-home__event-text">
										<h3><a class="no-decoration"  href="article.html">Biker's Community Day</a></h3>
										<p class="text text--footer-main-home">5 days Event. Starting April 5 , 9am</p>
									</div>
								</div>
								<div class="footer-main-home__event clearfix">
									<div class="event-num triangle pull-right">17</div>
									<div class="footer-main-home__event-text">
										<h3><a class="no-decoration"  href="article.html">Win 5 Bikes Event</a></h3>
										<p class="text text--footer-main-home">1 days Event on April 17th 2015</p>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-3 col-xs-6 wow slideInUp" data-wow-delay="0.7s" data-wow-duration="1.5s">
							<div class="footer-main-home__block equal-height-item footer-main-home__block--img">
								<h2 class="footer-main-home__title">Flickr Feed</h2>
								<div class="row row--no-padding">
									<div class="col-xs-4">
										<a href="#"><img class="img-responsive" alt="bike" src="media/80x80/footer1.jpg" /></a>
									</div>
									<div class="col-xs-4">
										<a href="#"><img class="img-responsive" alt="bike" src="media/80x80/footer2.jpg" /></a>
									</div>
									<div class="col-xs-4">
										<a href="#"><img class="img-responsive" alt="bike" src="media/80x80/footer3.jpg" /></a>
									</div>
									<div class="col-xs-4">
										<a href="#"><img class="img-responsive" alt="bike" src="media/80x80/footer4.jpg" /></a>
									</div>
									<div class="col-xs-4">
										<a href="#"><img class="img-responsive" alt="bike" src="media/80x80/footer5.jpg" /></a>
									</div>
									<div class="col-xs-4">
										<a href="#"><img class="img-responsive" alt="bike" src="media/80x80/footer6.jpg" /></a>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-3 col-xs-6 wow slideInRight" data-wow-delay="0.7s" data-wow-duration="2.5s">
							<div class="footer-main-home__block equal-height-item">
								<h2 class="footer-main-home__title">Contact info</h2>
								<div class="phone">(100) 987 6540</div>
								<h5 class="footer-main-home__address-title">Club Address</h5>
								<p class="text text--footer-main-home">3638 Ground Avenue, Hill Station,<br />
									Hollywood CA 00765<br />
									USA</p>
								<div class="email"><span>Email: </span>hello@bikesclub.com</div>
							</div>
						</div>
					</div>
				</div>
			</div><!--footer-main-home-->

			<div class="footer-bottom-home">
				<div  class="container">
					<div class="copyright wow fadeInUp" data-wow-delay="0.7s" data-wow-duration="1.5s">
						<p>&copy; Copyrights 2015 by <span>Templines</span> | <span>BikerClub. </span> All rights reserved.</p>
					</div>
				</div>
			</div>
			<a id="to-top" href="#header-top"><i class="fa fa-chevron-up"></i></a>
		</footer><!--home-footer-->
		<!--Main-->   
		<script src="js/jquery-1.11.3.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/modernizr.custom.js"></script>
		<!-- Angular -->
	    <script src="js/angular/angular.js"></script>
	    <script src="js/angular-animate/angular-animate.js"></script>
	    <script src="js/angular-resource/angular-resource.js"></script>
	    <script src="js/angular-route/angular-route.js"></script>
	    <script src="js/angular-bootstrap/ui-bootstrap-tpls-2.3.0.min.js"></script>
	    <!-- Angular-App-->
	    <script src="angular-app/angular-modal-service.js"></script>
	    <script src="angular-app/user/user.js"></script>
	    <!-- <script src="angular-app/ride2/ride.js"></script> -->
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