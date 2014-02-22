<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>HR :: Task Manager</title>

		<link rel="stylesheet" type="text/css" href="_styles/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="_styles/bootstrap-theme.css" />
		<link rel="stylesheet" type="text/css" href="_styles/style.css" />

		<script src="_scripts/jquery-2.1.0.js" ></script>
		<script src="_scripts/bootstrap.js" ></script>
		<script src="_scripts/underscore.js" ></script>
		<script src="_scripts/backbone.js" ></script>

		<script src="_scripts/loader.js" ></script>
	</head>
	<body>

		<!-- Header Start -->

		<?php include_once 'header.php'; ?>

		<!-- Header Ends -->


		<!-- Page Starts -->

		<?php

		$url = "home";
		if($_GET['page'])
		{
			$url = $_GET['page'];
		}
		$url = $url.".php";

		include_once $url

		?>

		<!-- Page Ends -->


		<!-- Footer Starts  -->

		<?php include_once 'footer.php'; ?>

		<!-- Footer Ends -->
	</body>
</html>
