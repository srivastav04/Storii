"use client";

import { useEffect, useRef, useState } from 'react';


export function ToogleText({ bio }) {
    const [expanded, setExpanded] = useState(false);
    const [showToggle, setShowToggle] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (el) {
            const computedStyle = getComputedStyle(el);
            const lineHeight = parseFloat(computedStyle.lineHeight);
            const lines = el.scrollHeight / lineHeight;

            // ✅ Show toggle only if bio has more than 3 lines
            if (lines > 3) setShowToggle(true);
        }
    }, [bio]);

    return (
        <>
            <p
                ref={ref}
                className={`text-medium font-roboto text-gray-800 leading-tight ${!expanded ? "overflow-hidden" : ""
                    }`}
                style={
                    !expanded
                        ? {
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3, // ✅ Clamp to 3 lines
                            overflow: "hidden",
                        }
                        : {}
                }
            >
                {bio}
            </p>

            {showToggle && (
                <button
                    onClick={() => setExpanded((e) => !e)}
                    className="mt-1 text-indigo-500 text-sm font-medium hover:underline inline "
                >
                    {expanded ? "Show less" : "Show more"}
                </button>
            )}
        </>
    );
}

export function FormatDate({ data }) {
    const dateStr = data.split("T")[0];
    const date = new Date(dateStr);

    const formatted = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date);

    return (
        <div className="pb-1 px-3">

            <p className='text-xs text-gray-500 leading-tight'>{formatted}</p>
        </div>
    )

}