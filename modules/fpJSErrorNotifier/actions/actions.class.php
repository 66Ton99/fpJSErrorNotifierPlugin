<?php

/**
 * fpErrorNotifier actions.
 *
 * @author Ton Sharp <forma@66ton99.org.ua>
 */
class fpJSErrorNotifierActions extends sfActions
{

  /**
   * (non-PHPdoc)
   * @see sfAction::preExecute()
   */
  public function preExecute()
  {
  }

  /**
   * Get and send error by email
   *
   * @param sfRequest $request
   *
   * @return sfView::NONE
   */
  public function executeIndex(sfRequest $request) {
//    $this->forward404Unless($request->isXmlHttpRequest(), 'It should be AJAX request');

    $e = new fpJSError(
      $request->getParameter('msg'),
      E_ERROR,
      E_ERROR,
      $request->getParameter('file'),
      $request->getParameter('line')
    );

    $uri = $_SERVER['REQUEST_URI'];

    $url = $request->getParameter('url');
    $_SERVER['REQUEST_URI'] = substr($url, strpos($url, '/', strlen('http:// ')));

    fpErrorNotifier::getInstance()->handler()->handleException($e);
    $_SERVER['REQUEST_URI'] = $uri;
    $this->renderText('OK');
    return sfView::NONE;
  }
}
