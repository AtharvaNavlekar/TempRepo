"use client";

import * as Icons from "@/components/icons";
import React from "react";

interface RenderIconProps {
    name: string;
    className?: string;
}

/**
 * Dynamically renders an icon from the centralized icon library based on its string name.
 * Useful for data-driven UIs where icon names are stored in arrays/objects.
 */
export default function RenderIcon({ name, className = "" }: RenderIconProps) {
    if (!name) return null;

    // Get the icon component from the library
    const IconComponent = (Icons as any)[name];

    if (!IconComponent) {
        console.warn(`[RenderIcon] Icon "${name}" not found in @/components/icons`);
        return null;
    }

    return <IconComponent className={className} />;
}
