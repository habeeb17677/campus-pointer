import {
  Search,
  Menu,
  X,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toolCategories } from "../data/tools";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const allTools = useMemo(() => {
    return toolCategories.flatMap((category) =>
      category.tools.map((tool) => ({
        ...tool,
        category: category.name,
      })),
    );
  }, []);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return allTools.slice(0, 6);
    }

    return allTools
      .filter((tool) => {
        const searchableText = [
          tool.name,
          tool.description,
          tool.category,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .slice(0, 8);
  }, [allTools, searchQuery]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const openSearch = () => {
    setSearchOpen(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleToolClick = (path) => {
    closeSearch();
    closeMenu();
    navigate(path);
  };

  useEffect(() => {
    setSearchOpen(false);
    setSearchQuery("");
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleKeyboardShortcut = (event) => {
      const target = event.target;

      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement;

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        openSearch();
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyboardShortcut);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyboardShortcut,
      );
    };
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
              <GraduationCap size={20} strokeWidth={2} />
            </div>

            <span className="text-[17px] font-bold tracking-tight text-slate-950 sm:text-lg">
              CampusPointer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="ml-8 hidden items-center gap-7 lg:flex">
            <Link
              to="/"
              className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
            >
              Home
            </Link>

            <Link
              to="/calculators"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Calculators
            </Link>

            <Link
              to="/study-tools"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Study Tools
            </Link>

            <Link
              to="/student-life"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Student Life
            </Link>

            <Link
              to="/resources"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Resources
            </Link>
          </nav>

          {/* Desktop Search */}
          <div
            ref={searchRef}
            className="relative ml-auto hidden md:block"
          >
            <button
              type="button"
              onClick={openSearch}
              className="group flex h-10 min-w-[190px] items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-left text-sm text-slate-500 transition hover:border-slate-300 hover:bg-white hover:text-slate-700"
            >
              <Search
                size={17}
                strokeWidth={2}
                className="text-slate-400 transition group-hover:text-slate-600"
              />

              <span className="flex-1">Search tools</span>

              <kbd className="hidden rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[11px] font-medium text-slate-400 lg:inline-block">
                /
              </kbd>
            </button>

            {/* Desktop Search Dropdown */}
            {searchOpen && (
              <div className="absolute right-0 top-12 w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                <div className="border-b border-slate-100 p-3">
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                    <Search
                      size={17}
                      className="shrink-0 text-slate-400"
                    />

                    <input
                      ref={inputRef}
                      type="search"
                      value={searchQuery}
                      onChange={(event) =>
                        setSearchQuery(event.target.value)
                      }
                      placeholder="Search GPA, attendance, budget..."
                      className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                      aria-label="Search student tools"
                    />

                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          inputRef.current?.focus();
                        }}
                        className="rounded-md px-1.5 py-1 text-xs text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                        aria-label="Clear search"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-[380px] overflow-y-auto p-2">
                  {searchResults.length > 0 ? (
                    <>
                      {!searchQuery.trim() && (
                        <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Popular tools
                        </p>
                      )}

                      {searchResults.map((tool) => (
                        <button
                          key={tool.path}
                          type="button"
                          onClick={() => handleToolClick(tool.path)}
                          className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                            <Search
                              size={16}
                              strokeWidth={2}
                              className="text-slate-600"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-slate-900">
                              {tool.name}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-slate-500">
                              {tool.description}
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            <span className="hidden text-[11px] font-medium text-slate-400 sm:block">
                              {tool.category}
                            </span>

                            <ArrowRight
                              size={15}
                              className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-600"
                            />
                          </div>
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                        <Search
                          size={18}
                          className="text-slate-400"
                        />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-900">
                        No tools found
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Try GPA, attendance, budget, study, or exam.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Search + Menu */}
          <div className="ml-auto flex items-center gap-1.5 md:hidden">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search tools"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              <Search size={20} strokeWidth={2} />
            </button>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {menuOpen ? (
                <X size={21} strokeWidth={2} />
              ) : (
                <Menu size={21} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {searchOpen && (
          <div
            ref={!searchRef.current ? searchRef : undefined}
            className="border-t border-slate-100 bg-white px-4 pb-4 pt-3 shadow-lg md:hidden"
          >
            <div className="relative">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search
                  size={18}
                  className="shrink-0 text-slate-400"
                />

                <input
                  ref={inputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search tools..."
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  aria-label="Search student tools"
                />

                <button
                  type="button"
                  onClick={closeSearch}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                  aria-label="Close search"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-2 max-h-[320px] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                {searchResults.length > 0 ? (
                  searchResults.map((tool) => (
                    <button
                      key={tool.path}
                      type="button"
                      onClick={() => handleToolClick(tool.path)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                        <Search
                          size={16}
                          className="text-slate-600"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900">
                          {tool.name}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {tool.description}
                        </p>
                      </div>

                      <ArrowRight
                        size={15}
                        className="shrink-0 text-slate-300"
                      />
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-7 text-center">
                    <p className="text-sm font-semibold text-slate-900">
                      No tools found
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Try searching for GPA, attendance, budget, or study.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg md:hidden">
            <nav className="flex flex-col">
              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-xl px-3 py-3.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Home
              </Link>

              <Link
                to="/calculators"
                onClick={closeMenu}
                className="rounded-xl px-3 py-3.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Calculators
              </Link>

              <Link
                to="/study-tools"
                onClick={closeMenu}
                className="rounded-xl px-3 py-3.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Study Tools
              </Link>

              <Link
                to="/student-life"
                onClick={closeMenu}
                className="rounded-xl px-3 py-3.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Student Life
              </Link>

              <Link
                to="/resources"
                onClick={closeMenu}
                className="rounded-xl px-3 py-3.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Resources
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;