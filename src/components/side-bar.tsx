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
import { useAuthStore, useProfileState } from "@/lib/storage/auth-storage";
import Image from "next/image";
import CardAnimation from "./animations/card-animation";
import { LogOut, Newspaper, NotebookText, Settings, ShoppingBasket } from "lucide-react";
import BadgeAlertOrders from "@/features/badge-alert/components/badge-alert-orders";
import { signOut } from "@/features/auth/actions";

const SideBar = () => {
  const { closeSideBar, stateSideBar } = useSideBarStore((state) => state);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {profile, loadingProfile} = useProfileState()

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
                {loadingProfile ? (
                  <li className="flex gap-2 items-center">
                    <CardAnimation className="h-5 w-5 rounded-full"/>
                    <CardAnimation className="h-2 w-20"/>
                  </li>
                ) : profile ? (
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
                        src={profile.avatar_url ?? "/icons/user-none.svg"}
                        alt={profile.first_name}
                        width={50}
                        height={50}
                        className="object-cover rounded-full h-[2rem] w-[2rem]"
                      />
                      <h4>{profile.first_name + (profile.last_name ?? "")}</h4>
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
                              <li onClick={closeSideBar}>
                                  <Link className="flex items-center gap-2 hover:underline" href={"/dashboard/biographies"}>
                                      <Newspaper className="text-ash-gray" size={20}/>
                                      Mis Biografías
                                  </Link>
                              </li>
                              <li onClick={closeSideBar}>
                                  <Link className="flex items-center justify-between hover:underline" href={"/dashboard/orders"}>
                                      <div className="flex items-center gap-2">
                                          <ShoppingBasket className="text-ash-gray" size={20}/>
                                          Órdenes
                                      </div>
                                      <BadgeAlertOrders/>
                                  </Link>
                              </li>
                              <li onClick={closeSideBar}>
                                  <Link className="flex items-center gap-2 hover:underline" href={"/dashboard/biographies/create"}>
                                      <NotebookText className="text-ash-gray" size={20}/>
                                      Crear Biografía
                                  </Link>
                              </li>
                              <li onClick={closeSideBar}>
                                  <Link className="flex items-center gap-2 hover:underline" href={"/dashboard/settings"}>
                                      <Settings className="text-ash-gray" size={20}/>
                                      Configuraci&oacute;n
                                  </Link>
                              </li>
                              <li onClick={async()=>{
                                  await signOut()
                                  closeSideBar()
                              }} className="flex cursor-pointer items-center gap-2 hover:underline"
                              >
                                  <LogOut className="text-ash-gray" size={20}/>
                                  Logout
                              </li>
                            </motion.ul>
                        )}
                        </AnimatePresence>
                    </div>

                  </li>
                ): (
                  <li className="space-x-2 ml-6">
                      <Link href={"/login"}>
                          <ButtonOutline className="py-1" >
                              Iniciar Sesión
                          </ButtonOutline>
                      </Link>
                      <Link href={"/register"}>
                          <ButtonOutline className="py-1" >
                              Registrarse
                          </ButtonOutline>
                      </Link>
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
