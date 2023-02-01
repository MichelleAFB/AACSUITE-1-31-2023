import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodayEventBox from "../../components/TodayEventBox";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

function VoteOnMenuPage({ visibility, event }) {
  const [menu, setMenu] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [employee, setEmployee] = useState();

  const [sandwhiches, setSandwhiches] = useState(false);
  const [starters, setStarters] = useState(false);
  const [sweets, setSweets] = useState(false);

  const [choiceSandwhich, setChoiceSandwhich] = useState();
  const [choiceStarter, setChoiceStarter] = useState();
  const [choiceSweet, setChoiceSweet] = useState();

  const [sandwhichActive, setSandwhichActive] = useState(true);
  const [starterActive, setStarterActive] = useState(true);
  const [sweetActive, setSweetActive] = useState(true);

  useEffect(() => {
    const menuItems = [];
    const prom = new Promise((resolve, reject) => {
      axios
        .get("https://accserverheroku.herokuapp.com/menu")
        .then((response) => {
          setEmployee(JSON.parse(sessionStorage.getItem("employee")));
          if (!response) {
            console.log("SUMN WRONG");
          }
          const data = response.data.results;
          console.log(data);
          data.map((d) => {
            menuItems.push(d);
          });
          resolve();
        });
    });

    prom
      .then(() => {
        setMenu(menuItems);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("could not get menu");
      });
    console.log("hi");
  }, [visibility, sandwhichActive, starterActive, sweetActive]);

  console.log(event);
  console.log("sandwhich act on re:" + sandwhichActive);
  console.log(choiceSandwhich);
  console.log(choiceSandwhich + " " + choiceStarter + " " + choiceSweet);

  console.log(sandwhichActive + " .." + starterActive + " .." + sweetActive);

  console.log(event);

  const flip = {
    hidden: {
      transform: "scale(0) rotateX(-360deg)",
      opacity: 0,
      transition: {
        delay: 2,
      },
    },
    visible: {
      transform: " scale(1) rotateX(0deg)",
      opacity: 1,
      transition: {
        duration: 1,
        delay: 2,
      },
    },
    exit: {
      transform: "scale(0) rotateX(360deg)",
      opacity: 0,
      transition: {
        duration: 1,
        delay: 2,
      },
    },
  };
  if (!isLoading && visibility) {
    return (
      <div class='flex'>
        <motion.div
          variants={flip}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <section class='bg-gray-700 p-20 rounded-md overflow-y-auto '>
            <div
              class='grid w-[40rem] grid-cols-3 space-x-2 rounded-xl bg-gray-200 p-2 mb-5 '
              x-data='app'
            >
              <div
                onClick={() => {
                  setSandwhiches(true);
                  setSweets(false);
                  setStarters(false);
                }}
              >
                <input type='radio' name='option' id='1' class='peer hidden' />
                <label
                  for='1'
                  class='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'
                >
                  Sandwhiches
                </label>
              </div>

              <div
                onClick={() => {
                  setStarters(true);
                  setSweets(false);
                  setSandwhiches(false);
                }}
              >
                <input type='radio' name='option' id='2' class='peer hidden' />
                <label
                  for='2'
                  class='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'
                >
                  Starters
                </label>
              </div>

              <div
                onClick={() => {
                  setSweets(true);
                  console.log(sweets);
                  setStarters(false);
                  setSandwhiches(false);
                }}
              >
                <input type='radio' name='option' id='3' class='peer hidden' />
                <label
                  for='3'
                  class='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'
                >
                  Sweets
                </label>
              </div>
            </div>
            <div class='bg-gray-400 p-5 rounded-md'>
              {sandwhiches ? (
                <div class='bg-blend-darken  p-5 rounded-md grid grid-cols-3 gap-y-5 gap-x-3'>
                  {menu.map((m) => {
                    if (m.category == "HANDCRAFTED SANDWICHES,") {
                      return (
                        <div
                          class={
                            choiceSandwhich == m.name
                              ? " p-3 rounded-md hover:shadow-xl bg-green-400"
                              : "bg-orange-100 p-3 rounded-md hover:shadow-xl "
                          }
                          onClick={() => {
                            setSandwhichActive(!sandwhichActive);
                            console.log("sandwhich active:" + sandwhichActive);
                            if (sandwhichActive) {
                              setChoiceSandwhich(m.name);
                              console.log("sandwhich:" + choiceSandwhich);
                            }
                          }}
                        >
                          <p>{m.name}</p>
                          <br />
                          <p class='text-md'>{m.description}</p>
                        </div>
                      );
                    }
                  })}
                </div>
              ) : (
                <h1></h1>
              )}
              {starters ? (
                <div class='bg-blend-darken  p-5 rounded-md grid grid-cols-3 gap-y-5 gap-x-3'>
                  {menu.map((m) => {
                    if (m.category == "WARM UPS") {
                      return (
                        <button
                          class={
                            choiceStarter == m.name
                              ? " p-3 rounded-md hover:shadow-xl bg-green-400"
                              : "bg-orange-100 p-3 rounded-md hover:shadow-xl "
                          }
                          onClick={() => {
                            setStarterActive(!starterActive);
                            if (starterActive) {
                              setChoiceStarter(m.name);
                            }
                          }}
                        >
                          <p class='font-bold'>{m.name}</p>
                          <br />
                          <p class='text-md'>{m.description}</p>
                        </button>
                      );
                    }
                  })}
                </div>
              ) : (
                <h1></h1>
              )}
              {sweets ? (
                <div class='bg-blend-darken  p-5 rounded-md grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-y-5 gap-x-3'>
                  {menu.map((m) => {
                    if (m.category == "SUITE SWEETS") {
                      return (
                        <button
                          class={
                            choiceSweet == m.name
                              ? " p-3 rounded-md hover:shadow-xl bg-green-400"
                              : "bg-orange-100 p-3 rounded-md hover:shadow-xl "
                          }
                          onClick={() => {
                            setSweetActive(!sweetActive);
                            if (sweetActive) {
                              setChoiceSweet(m.name);
                            }
                          }}
                        >
                          <p class='font-bold'>{m.name}</p>
                          <br />
                          <p class='text-md'>{m.description}</p>
                        </button>
                      );
                    }
                  })}
                </div>
              ) : (
                <h1></h1>
              )}
              {!sweets && !sandwhiches && !starters ? (
                <div class='bg-blend-darken  p-5 rounded-md grid grid-cols-3 gap-y-5 gap-x-3'>
                  <h1>Vote on a menu item from each category</h1>
                </div>
              ) : (
                <h1></h1>
              )}
            </div>
            <div class='flex justify-end'>
              {!sandwhichActive &&
              !starterActive &&
              !sweetActive &&
              choiceSandwhich != null &&
              choiceStarter != null &&
              choiceSweet != null ? (
                <button
                  class='p-3 bg-green-300 rounded-md mt-3 hover:bg-green-400'
                  onClick={() => {
                    const prom = new Promise((resolve, reject) => {
                      axios
                        .post(
                          "https://accserverheroku.herokuapp.com/company/votes",
                          {
                            sandwhich: choiceSandwhich,
                            starter: choiceStarter,
                            sweet: choiceSweet,
                            event: event,
                          }
                        )
                        .then((response) => {
                          console.log(response.data);
                          if (response.data.success == true) {
                            toast.success(
                              choiceStarter +
                                " | " +
                                choiceSandwhich +
                                " | " +
                                choiceSweet
                            );
                            setTimeout(() => {
                              resolve();
                            }, 2000);
                          }
                        });
                    });

                    prom.then(() => {
                      //setIsLoading(true)
                    });
                  }}
                >
                  <span>Submit</span>
                </button>
              ) : (
                <h1></h1>
              )}
            </div>
          </section>
        </motion.div>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const vis = state.employeeModal.showMenu;
  const event = state.employeeModal.event;
  console.log("vis: " + vis);
  return {
    visibility: vis,
    event: event.event,
  };
};

export default connect(mapStateToProps)(VoteOnMenuPage);
