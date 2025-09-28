import React from "react";
import { cn } from "../../utils/cn";

const Input = React.forwardRef(({
    className,
    type = "text",
    label,
    description,
    error,
    required = false,
    id,
    ...props
}, ref) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random()?.toString(36)?.substr(2, 9)}`;

    // Base input classes with 8px grid alignment
    const baseInputClasses = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    // Checkbox-specific styles with proper alignment
    if (type === "checkbox") {
        return (
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    className={cn(
                        "h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    id={inputId}
                    {...props}
                />
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-medium leading-none cursor-pointer select-none"
                    >
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </label>
                )}
            </div>
        );
    }

    // Radio button-specific styles with proper alignment
    if (type === "radio") {
        return (
            <div className="flex items-center space-x-2">
                <input
                    type="radio"
                    className={cn(
                        "h-4 w-4 rounded-full border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    id={inputId}
                    {...props}
                />
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-medium leading-none cursor-pointer select-none"
                    >
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </label>
                )}
            </div>
        );
    }

    // For regular inputs with proper 8px grid spacing
    return (
        <div className="space-y-2">
            {label && (
                <label
                    htmlFor={inputId}
                    className={cn(
                        "text-sm font-medium leading-none block",
                        error ? "text-destructive" : "text-foreground"
                    )}
                >
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </label>
            )}

            <input
                type={type}
                className={cn(
                    baseInputClasses,
                    error && "border-destructive focus-visible:ring-destructive",
                    className
                )}
                ref={ref}
                id={inputId}
                {...props}
            />

            {description && !error && (
                <p className="text-sm text-muted-foreground mt-1">
                    {description}
                </p>
            )}

            {error && (
                <p className="text-sm text-destructive mt-1">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";

export default Input;