"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/logo";
import Close from "@/components/icons/close";
import Link from "next/link";
import HomeIcon from "@/components/icons/home-icon";
import AboutIcon from "@/components/icons/about-icon-";
import ContactIcon from "@/components/icons/contact-icon";
import ButtonOutline from "@/components/buttons/button-outline";
import ButtonPrimary from "@/components/buttons/button-primary";
import { useSideBarStore } from "@/lib/storage/side-bar-storage";
import { useAuthStore } from "@/lib/storage/auth-storage";
import Image from "next/image";
import AccountIcon from "./icons/account-icon";
import LogoutIcon from "./icons/logout-icon";

const SideBar = () => {
  const { closeSideBar, stateSideBar } = useSideBarStore((state) => state);
  const { user, logOut } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = ()=>{
        try{
            logOut()
        }catch(err){
            console.log(err)
        }
    }

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const sidebarVariants = {
    hidden: { x: "100%" },
    visible: { x: "0%" },
    exit: { x: "100%" },
  };

  const menuVariants = {
    closed: { opacity: 0, transformOrigin: "top", y: "-100%" },
    open: { opacity: 1, transformOrigin: "top", y: "0%" },
  };

  const arrowVariants = {
    closed: { rotate: 0 },
    open: { rotate: 90 },
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <AnimatePresence>
      {stateSideBar && (
        <motion.div
          className="fixed z-[20] inset-0 bg-[#0000007c]"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backgroundVariants}
        >
          <motion.aside
            className="mx max-w-[25rem] h-full w-[80%] fixed top-0 right-0 bg-white p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            transition={{ type: "tween" }}
          >
            <div className="flex justify-between items-center">
              <Logo />
              <Close
                onClick={closeSideBar}
                className="cursor-pointer"
                width={20}
                height={20}
                color="#003F5F"
              />
            </div>

            <nav className="mt-6">
              <ul className="space-y-4">
                <li>
                  <Link
                    onClick={closeSideBar}
                    className="flex hover:underline items-center gap-2"
                    href="/"
                  >
                    <HomeIcon width={18} height={18} color="#003F5F" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={closeSideBar}
                    className="flex hover:underline items-center gap-2"
                    href="/about"
                  >
                    <AboutIcon width={18} height={18} color="#003F5F" />
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={closeSideBar}
                    className="flex hover:underline items-center gap-2"
                    href="/contact"
                  >
                    <ContactIcon width={18} height={18} color="#003F5F" />
                    Contact
                  </Link>
                </li>
                {!user ? (
                  <li className="flex gap-2 flex-col xs:flex-row">
                    <Link href="/login">
                      <ButtonOutline className="py-1 hover:shadow-md transition-all">
                        Empezar
                      </ButtonOutline>
                    </Link>
                  </li>
                ) : (
                  <li >
                    <div
                      className="flex cursor-pointer items-center gap-2"
                      onClick={toggleMenu}
                    >
                      <motion.span
                        className="text-[0.7rem]"
                        initial="closed"
                        animate={isMenuOpen ? "open" : "closed"}
                        variants={arrowVariants}
                      >
                        ❯
                      </motion.span>

                      <Image
                        src={user.photoURL!!}
                        alt=""
                        width={50}
                        height={50}
                        className="object-cover rounded-full h-[2rem] w-[2rem]"
                      />
                      <h4>{user.displayName}</h4>
                    </div>

                    <div className=" overflow-hidden mt-1">
                        <AnimatePresence>
                        {isMenuOpen && (
                            <motion.ul
                            className="pl-6 py-1 space-y-2"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            transition={{ duration: 0.3 }}
                            >
                            <li>
                                <Link
                                onClick={closeSideBar}
                                className="flex hover:underline gap-2 items-center"
                                href="/dashboard/biographies"
                                >
                                <AccountIcon
                                    width={20}
                                    height={20}
                                    color="#003F5F"
                                />
                                My account
                                </Link>
                            </li>
                            <li>
                                <button
                                onClick={handleLogout}
                                className="flex hover:underline gap-2 items-center"
                                >
                                <LogoutIcon
                                    width={18}
                                    height={18}
                                    color="#003F5F"
                                />
                                Logout
                                </button>
                            </li>
                            </motion.ul>
                        )}
                        </AnimatePresence>
                    </div>

                  </li>
                )}
              </ul>
            </nav>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
