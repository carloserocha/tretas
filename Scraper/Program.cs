using System;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using HtmlAgilityPack;
using ScrapySharp.Extensions;
using ScrapySharp.Network;

namespace Scraper
{
    class Program
    {
        static ScrapingBrowser _browser = new ScrapingBrowser();

        static void Main(string[] args) {
            var pageLinks = GetPageLinks("https://newyork.craigslist.org/d/computer-gigs/search/cpg");

            Console.WriteLine(string.Join("\n", pageLinks));
        }
        static List<string> GetPageLinks(string url) {
            var pageLinks = new List<string>();
            var html = GetHtml(url);

            // URL validation
            string pattern = @"/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/";
            Regex regexLink = new Regex(pattern, RegexOptions.Compiled | RegexOptions.IgnoreCase);

            var links = html.CssSelect("a");
            foreach (var link in links) {
                string href = link.Attributes["href"].Value;
                if (regexLink.Match(href).Success) {
                    pageLinks.Add(href);
                }
            }

            return pageLinks;            
        }

        static HtmlNode GetHtml(string url)  {
            WebPage page = _browser.NavigateToPage(
                new Uri (url)
            );

            return page.Html;
        }
    }
}
