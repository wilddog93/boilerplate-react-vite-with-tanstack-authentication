"use client";

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import { useThemeContext } from "@/provider";
import { Button, Tooltip } from "@nextui-org/react";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
}) => {
  const { theme, toggleTheme } = useThemeContext();

  const onChange = () => {
    if (theme === "light") {
      toggleTheme('dark')
    } else {
      toggleTheme('light')
    }
  };

  const {
    isSelected,
  } = useSwitch({
    isSelected: theme === "light",
    "aria-label": `Switch to ${theme === "light" ? "dark" : "light"} mode`,
    onChange,
  });

  return (
    <Tooltip radius="sm" showArrow={true} content={<div className="text-xs">Switch to {theme === "light" ? "dark" : "light"} mode</div>}>
      <Button
        isIconOnly
        variant="light"
        size="sm"
        radius="full"
        className={clsx("flex items-center gap-2", className)}
        onClick={onChange}
      >
        <VisuallyHidden>Toggle theme</VisuallyHidden>
        <div className={clsx("flex items-center gap-2", className)}>
          {!isSelected ? <SunFilledIcon size={24} />
            : <MoonFilledIcon size={24} />}
        </div>
      </Button>
    </Tooltip>
  );
};