'use strict';
import UserService from "./Services/UserService.js"
import EventBus from "./modules/eventBus.js";
import Router from "./modules/router.js";
import MenuView from "./views/MenuView.js"
import LeaderboardView from "./views/LeaderboardView.js"
import ProfileView from "./views/ProfileView.js"
import AboutView from "./views/AboutView.js";
import SignInView from "./views/SignInView.js";
import SignUpView from "./views/SignUpView.js";

window.bus = new EventBus();
const userService = new UserService();
const router = new Router(document.getElementById("root"));

window.bus.subscribe("draw-menu", () => { router.open({ path: '/' }) });
window.bus.subscribe("draw-profile", () => { router.open({ path: '/profile' }) });
window.bus.subscribe("draw-sign-up", () => { router.open({ path: '/signup' }) });
window.bus.subscribe("draw-sign-in", () => { router.open({ path: '/signin' }) });
window.bus.subscribe("draw-leaderboard", () => { router.open({ path: '/leaders' }) });
window.bus.subscribe("draw-about", () => { router.open({ path: '/about' }) });

window.bus.subscribe("successful_sign_in", () => { router.rerenderViews(['/profile']); router.open({ path: '/profile' }); });
window.bus.subscribe("successful_sign_up", () => { router.rerenderViews(['/profile']); router.open({ path: '/profile' }); });
window.bus.subscribe("successful_sign_out", () => { router.rerenderViews([]); router.open({ path: '/' }) });

window.bus.subscribe("sign-out", userService.SignOut);
window.bus.subscribe("sign-in", userService.SignIn);
window.bus.subscribe("sign-up", userService.SignUp);
window.bus.subscribe("update-avatar", userService.UpdateAvatar);

router
	.register('/', MenuView)
	.register('/leaders', LeaderboardView)
	.register('/profile', ProfileView)
	.register('/about', AboutView)
	.register('/signin', SignInView)
	.register('/signup', SignUpView)

router.start();
