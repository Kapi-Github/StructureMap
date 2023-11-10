import { useContext } from "react";
import { OptionsContext } from "../App";
import React from "react";

const Options = () => {
    const {
        handleObjectOptionClick,
        showObjectsOptions,
        objectsOptions,
        handleOptionClick,
        showPosibilities,
        objectName,
        searchValue,
        setSearchValue,
        posibilities,
        addObject,
    } = useContext(OptionsContext);
    return (
        <div
            className={`absolute left-[16px] top-[16px] bg-white rounded-[8px] z-50 shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
        >
            <div className={`relative flex flex-col gap-[8px] p-[4px]`}>
                <button
                    className={`p-[10px] bg-transparent hover:bg-[#F0E7E7] rounded-[8px] transition-bg duration-200 ease-in-out`}
                    onClick={() => handleObjectOptionClick("Group")}
                >
                    Add group
                </button>
                <button
                    className={`p-[10px] bg-transparent hover:bg-[#F0E7E7] rounded-[8px] transition-bg duration-200 ease-in-out`}
                    onClick={() => handleObjectOptionClick("Structure")}
                >
                    Add structure
                </button>
                {showObjectsOptions && (
                    <div
                        className={`absolute w-[80%] top-[105%] left-[10%] bg-white rounded-[8px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
                    >
                        <div className={`relative flex flex-col gap-[6px]`}>
                            {objectsOptions.map((option, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`py-[2px] text-center cursor-pointer hover:bg-[#F0E7E7] transiton-bg duration-200 ease-in-out`}
                                        onClick={() =>
                                            handleOptionClick(option)
                                        }
                                    >
                                        {option}
                                    </div>
                                );
                            })}
                            {showPosibilities && (
                                <div
                                    className={`absolute flex flex-col items-center gap-[10px] justify-center w-[250%] left-[105%] bottom-[0] bg-white rounded-[8px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden`}
                                >
                                    <div className={`text-center text-[2rem]`}>
                                        {objectName}
                                    </div>
                                    <input
                                        type="text"
                                        className={`m-[4px] bg-slate-200 rounded-[4px] border-b-1px border-black w-[60%] focus-within:w-[80%] transition-w duration-200 ease-in-out`}
                                        onChange={(e) =>
                                            setSearchValue(e.target.value)
                                        }
                                    />
                                    <div
                                        className={`flex flex-wrap justify-center gap-[4px] w-[100%]`}
                                    >
                                        {posibilities[
                                            objectsOptions.indexOf(objectName)
                                        ].map((posibility, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    {searchValue.length > 0 ? (
                                                        posibility
                                                            .toLowerCase()
                                                            .includes(
                                                                searchValue.toLowerCase()
                                                            ) && (
                                                            <div
                                                                className={`text-center cursor-pointer hover:bg-[#F0E7E7] transiton-bg duration-200 ease-in-out`}
                                                                onClick={() =>
                                                                    addObject(
                                                                        posibility
                                                                    )
                                                                }
                                                            >
                                                                {posibility}
                                                            </div>
                                                        )
                                                    ) : (
                                                        <div
                                                            key={index}
                                                            className={`py-[2px] w-[40%] text-center cursor-pointer hover:bg-[#F0E7E7] transiton-bg duration-200 ease-in-out`}
                                                            onClick={() =>
                                                                addObject(
                                                                    posibility
                                                                )
                                                            }
                                                        >
                                                            {posibility}
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Options;
