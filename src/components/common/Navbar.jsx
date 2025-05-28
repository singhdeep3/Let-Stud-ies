import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo/logonav.png";
import { navbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { Link, matchPath, matchRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/api";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { cart } = useSelector((state) => state.cart);
    const location = useLocation();
    const routesMatch = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    const [subLinks, setSubLinks] = useState([
        { title: "C++", link: "/catalog/c++" },
    ]);

    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result.data.data);
        } catch (error) {
            console.log("Could not fetched category list!");
        }
    };

    useEffect(() => {
        fetchSublinks();
    }, []);

    return (
        <div className="flex bg-rose-900 h-16 items-center justify-center shadow-[0_0_15px_10px_rgba(163,234,123,0.3)]">
            <div className="flex  lg:w-11/12 max-w-maxContent  items-center justify-between">
                <Link to={"/"}>
                    <img
                        src={Logo}
                        alt="Logo"
                        width={150}
                        height={150}
                        className="rounded-full object-left-top"
                        loading="lazy"
                    />
                </Link>

                <nav>
                    <ul className="flex gap-x-7 text-white font-bold">
                        {navbarLinks.map((link, idx) => (
                            <li key={idx}>
                                {link.title === "Catalog" ? (
                                    <div className="flex items-center  gap-3 group relative">
                                        <p>{link.title}</p>
                                        <IoIosArrowDropdownCircle />
                                        <div
                                            className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[80%] top-[50%]
                                         flex flex-col rounded-md bg-gray-700 p-4 text-black
                                          opacity-0 transition-all duration-200 group-hover:visible
                                           group-hover:opacity-100 w-[300px]"
                                        >
                                            <div className="absolute left-[51%] top-0 translate-y-[-20%] translate-x-[80%]  h-6 w-6 rotate-45 rounded bg-gray-700"></div>

                                            {
                                                subLinks.length ? (
                                                    subLinks.map((subLink,idx)=>(
                                                        <Link to={`${subLink.link}`} key={idx}>
                                                            <p className="font-bold text-white">{subLink.title}</p>
                                                        </Link>

                                                    ))
                                                ) : (<div></div>)
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <Link to={link?.path}>
                                        <p
                                            className={`${routesMatch(link?.path)
                                                    ? "text-yellow-400"
                                                    : "text-white"
                                                }`}
                                        >
                                            {link.title}
                                        </p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex items-center gap-x-4 ">
                    {user && user?.accountType != "Instructor" && (
                        <Link to={"/dashboard/cart"} className="relative">
                            <AiOutlineShoppingCart />
                            {cart > 0 && <span>{cart}</span>}
                        </Link>
                    )}
                    {token == null && (
                        <Link to={"/login"}>
                            <button className="border border-gray-900 bg-gray-800 rounded-md px-3 py-2.5 text-white font-bold">
                                LogIn
                            </button>
                        </Link>
                    )}
                    {token == null && (
                        <Link to={"/signup"}>
                            <button className="border border-gray-900 bg-gray-800 rounded-md px-3 py-2.5 text-white font-bold">
                                Sign-Up
                            </button>
                        </Link>
                    )}
                    {token !== null && <ProfileDropDown />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
