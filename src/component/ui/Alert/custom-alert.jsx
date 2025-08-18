import React, { useState, useEffect, forwardRef } from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { cn } from '../../../lib/Utlis';
import { cva } from 'class-variance-authority'; // Assuming properly configured

const alertVariants = cva(
  "relative flex items-start gap-4 p-6 backdrop-blur-lg border rounded-xl transition-all duration-300 animate-alert-in shadow-lg",
  {
    variants: {
      variant: {
        success: "bg-glass-bg border-success/40 shadow-success/20 ring-1 ring-success/10",
        warning: "bg-glass-bg border-warning/40 shadow-warning/20 ring-1 ring-warning/10", 
        error: "bg-glass-bg border-destructive/40 shadow-destructive/20 ring-1 ring-destructive/10",
        info: "bg-glass-bg border-info/40 shadow-info/20 ring-1 ring-info/10",
        default: "bg-glass-bg border-primary/40 shadow-primary/20 ring-1 ring-primary/10"
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

const iconVariants = cva(
  "flex-shrink-0 w-5 h-5 animate-pulse-glow",
  {
    variants: {
      variant: {
        success: "text-success-glow",
        warning: "text-warning-glow",
        error: "text-destructive",
        info: "text-info-glow", 
        default: "text-primary-glow"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

const getIcon = (variant) => {
  switch (variant) {
    case 'success':
      return CheckCircle;
    case 'warning':
      return AlertTriangle;
    case 'error':
      return AlertCircle;
    case 'info':
      return Info;
    default:
      return Info;
  }
};

const CustomAlert = forwardRef(({
  className,
  variant = "default",
  size,
  title,
  description,
  onClose,
  autoClose = false,
  autoCloseDelay = 5000,
  showIcon = true,
  children,
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, 300);
  };

  if (!isVisible) return null;

  const Icon = getIcon(variant);

  return (
    <div
      ref={ref}
      className={cn(
        alertVariants({ variant, size }),
        isAnimatingOut && "animate-alert-out",
        className
      )}
      {...props}
    >
      {showIcon && <Icon className={cn(iconVariants({ variant }))} />}

      <div className="flex-1 min-w-0">
        {title && (
          <h3 className="font-semibold text-foreground mb-1 leading-tight">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-2">
            {children}
          </div>
        )}
      </div>

      {onClose && (
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1.5 rounded-lg hover:bg-glass-hover transition-all duration-200 text-muted-foreground hover:text-foreground border border-transparent hover:border-border/20"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
});

CustomAlert.displayName = "CustomAlert";

export { CustomAlert, alertVariants };
